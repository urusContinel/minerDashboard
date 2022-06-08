import { Op } from 'sequelize';
import { Spot } from '@binance/connector';
import { Asic } from '../database/models.Asics.js';
import { Clients } from '../database/models.Clients.js';
import { D_hashrate, H_hashrate } from '../database/models.AsicsHashRate.js';

export default function UserBinance() {
	try {
		Clients.findAll({
			attributes: [
				'id',
				'binanceApiKey',
				'binanceApiSecret',
				'binanceSubName',
			],
		}).then((users) => {
			users.map((user) => {
				let client = new Spot(
					user.dataValues.binanceApiKey,
					user.dataValues.binanceApiSecret
				);
				GetWorkerList(client, 'SHA256', user.dataValues);
			});
		});
	} catch (e) {
		return JSON.stringify(e);
	}
	return '';
}
function GetWorkerList(client, algoName, user) {
	client.miningWorkerList(algoName, user.binanceSubName).then((response) => {
		let WorkerList = response.data.data.workerDatas;
		if (Array.isArray(WorkerList)) {
			WorkerList.map((w) => {
				UpdateIfAsicsExists(w, user).then((id) => {
					GetMinerInfo(
						client,
						algoName,
						user.binanceSubName,
						w.workerName,
						id
					);
				});
			});
		}
	});
}
function UpdateIfAsicsExists(AsicArray, user) {
	Clients.hasMany(Asic);
	Asic.belongsTo(Clients);
	let r = Asic.findOne({ where: { name: AsicArray.workerName } }).then(
		(a) => {
			let id_Asic;
			if (a === null) {
				id_Asic = Asic.create(
					{
						workerId: AsicArray.workerId,
						name: AsicArray.workerName,
						status: AsicArray.status,
						hashRate: AsicArray.hashRate,
						dayHashRate: AsicArray.dayHashRate,
						/* rejectRate: AsicArray.rejectRate, */
						lastShareTime: AsicArray.lastShareTime,
						ClientId: user.id,
					},
					{ include: [Clients] }
				).complete(function (err, result) {
					if (err) {
						return null;
					} else {
						return result.id;
					}
				});
			} else {
				id_Asic = a.id;
				if (
					new Date(a.lastShareTime) <=
					new Date(AsicArray.lastShareTime)
				) {
					Asic.update(
						{
							status: AsicArray.status,
							hashRate: AsicArray.hashRate,
							dayHashRate: AsicArray.dayHashRate,
							/* rejectRate: AsicArray.rejectRate, */
							lastShareTime: AsicArray.lastShareTime,
						},
						{ where: { name: AsicArray.workerName } }
					);
				}
			}
			return id_Asic;
		}
	);
	return Promise.resolve(r);
}
function GetMinerInfo(client, algoName, userName, workerName, workerId) {
	client.miningWorker(algoName, userName, workerName).then((response) => {
		let data = response.data;
		if (data.code === 0) {
			data.data.map((w) => {
				switch (w.type) {
					case 'H_hashrate':
						update_H_hashrate(w.hashrateDatas, workerId);
						break;
					case 'D_hashrate':
						update_D_hashrate(w.hashrateDatas, workerId);
						break;
				}
			});
		}
	});
}
function update_H_hashrate(hashrateDatas, workerId) {
	Asic.hasMany(H_hashrate);
	H_hashrate.belongsTo(Asic);
	hashrateDatas.map((hashrate) => {
		H_hashrate.findOne({
			where: {
				[Op.and]: [{ time: hashrate.time }, { asicId: workerId }],
			},
		}).then((h_r) => {
			if (h_r === null) {
				H_hashrate.create(
					{
						time: hashrate.time,
						hashrate: hashrate.hashrate,
						reject: hashrate.reject,
						asicId: workerId,
					},
					{ include: [Asic] }
				);
			}
		});
	});
}
function update_D_hashrate(hashrateDatas, workerId) {
	Asic.hasMany(D_hashrate);
	D_hashrate.belongsTo(Asic);
	hashrateDatas.map((hashrate) => {
		D_hashrate.findOne({
			where: {
				[Op.and]: [{ time: hashrate.time }, { asicId: workerId }],
			},
		}).then((d_r) => {
			if (d_r === null) {
				D_hashrate.create(
					{
						time: hashrate.time,
						hashrate: hashrate.hashrate,
						reject: hashrate.reject,
						asicId: workerId,
					},
					{ include: [Asic] }
				);
			}
		});
	});
}

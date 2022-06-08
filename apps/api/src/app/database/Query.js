import { H_hashrate, D_hashrate } from './models.AsicsHashRate.js';
import { Asic } from './models.Asics.js';
import { Clients } from './models.Clients.js';
import { Admin } from './models.Admin.js';
import { AsicsModels } from './models.AsicsModels.js';
import { async } from 'regenerator-runtime';
const bcrypt = require('bcrypt');

function checkUser(password, UserPassword) {
	return bcrypt.compareSync(password, UserPassword);
}

export let ListQuery = {
	hashrate_day: async (args) => {
		Asic.hasMany(D_hashrate);
		D_hashrate.belongsTo(Asic);
		let r = await D_hashrate.findAll({ where: args }).then((q) => {
			return q.map((i) => {
				return i.dataValues;
			});
		});
		return r;
	},
	hashrate_hour: async (args) => {
		Asic.hasMany(H_hashrate);
		H_hashrate.belongsTo(Asic);
		let r = await H_hashrate.findAll({ where: args }).then((q) => {
			return q.map((i) => {
				return i.dataValues;
			});
		});
		return r;
	},
	asic: async (args) => {
		Clients.hasMany(Asic);
		Asic.belongsTo(Clients);
		let r = await Asic.findAll({ where: args }).then((q) => {
			return q.map((i) => {
				return i.dataValues;
			});
		});
		return r;
	},
	client: async (_, args) => {
		let r = await Clients.findAll({ where: args }).then((q) => {
			return q.map((i) => {
				return i.dataValues;
			});
		});
		return r;
	},
	admin: async (args) => {
		let r = await Admin.findOne({ where: args }).then((i) => {
			return {
				id: i.dataValues.id,
				username: i.dataValues.username,
				password: i.dataValues.password,
				surname: i.dataValues.surname,
				name: i.dataValues.name,
				patronymic: i.dataValues.patronymic,
			};
		});
		return r;
	},
	user: async (args) => {
		console.log(args);
		const saltRounds = 10;
		const hash = bcrypt.hashSync(args.password, saltRounds);
		console.log('password -> ', args.password, ' ; hash -> ', hash);
		let r = await Admin.findOne({
			where: { username: args.username },
		}).then((q) => {
			if (
				!!q &&
				!!q.dataValues &&
				checkUser(args.password, q.dataValues.password)
			) {
				return {
					__typename: 'admin',
					id: Number(q.dataValues.id),
					username: String(q.dataValues.username),
					password: String(q.dataValues.password),
					surname: String(q.dataValues.surname),
					name: String(q.dataValues.name),
					patronymic: String(q.dataValues.patronymic),
				};
			} else {
				return {};
			}
		});
		if (Object.keys(r).length === 0) {
			r = await Clients.findOne({
				where: { username: args.username },
			}).then((q) => {
				if (
					!!q &&
					!!q.dataValues &&
					checkUser(args.password, q.dataValues.password)
				) {
					return {
						__typename: 'client',
						id: Number(q.dataValues.id),
						username: String(q.dataValues.username),
						password: String(q.dataValues.password),
						surname: String(q.dataValues.surname),
						name: String(q.dataValues.name),
						patronymic: String(q.dataValues.patronymic),
						phone: String(q.dataValues.phone),
						binanceApiKey: String(q.dataValues.binanceApiKey),
						binanceApiSecret: String(q.dataValues.binanceApiSecret),
						binanceSubName: String(q.dataValues.binanceSubName),
						createdAt: String(q.dataValues.createdAt),
						updatedAt: String(q.dataValues.updatedAt),
					};
				} else {
					return {};
				}
			});
		}
		if (Object.keys(r).length === 0) {
			r = {
				__typename: 'error',
				errorType: 'failed autorization',
				errorNo: 1,
				errorText: 'login or password wrong!',
			};
		}
		return r;
	},
	UpsertMiner: async (args) => {
		let returns = {};
		if (Object.prototype.hasOwnProperty.call(args, 'id')) {
			const { id, ...variables } = args;
			returns = await Asic.update(variables, {
				where: { id: id },
			}).then((q) => {
				console.log(q[0]);
				if (q[0]) {
					returns = Asic.findOne({ where: { id: id } }).then(
						(q) => {
							return q.dataValues;
						}
					);
				}
			});
		} else {
			returns = await Asic.create(args);
		}
		return returns;
	},
	MinerModels: async () => {
		let r = await AsicsModels.findAll().then((q) => {
			return q.map((i) => {
				return i.dataValues;
			});
		});
		return r;
	},
	UpsertMinerModels: async (args) => {

		let returns = {};
		if (Object.prototype.hasOwnProperty.call(args, 'id')) {
			const { id, ...variables } = args;
			returns = await AsicsModels.update(variables, {
				where: { id: id },
			}).then((q) => {
				console.log(q[0]);
				if (q[0]) {
					returns = AsicsModels.findOne({ where: { id: id } }).then(
						(q) => {
							return q.dataValues;
						}
					);
				}
			});
		} else {
			returns = await AsicsModels.create(args);
		}
		return returns;
	},
	UpsertClient: async (args) => {
		let returns = {};
		if (Object.prototype.hasOwnProperty.call(args, 'id')) {
			const { id, ...variables } = args;
			returns = await Clients.update(variables, {
				where: { id: id },
			}).then((q) => {
				console.log(q[0]);
				if (q[0]) {
					returns = Clients.findOne({ where: { id: id } }).then(
						(q) => {
							return q.dataValues;
						}
					);
				}
			});
		} else {
			returns = await Clients.create(args);
		}
		return returns;
	},
};

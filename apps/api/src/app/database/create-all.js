import { Asic } from './models.Asics.js';
import { Admin } from './models.Admin.js';
import { Clients } from './models.Clients.js';
import { D_hashrate, H_hashrate } from './models.AsicsHashRate.js';
import { AsicsModels } from './models.AsicsModels.js';
const ClientsArray = [
	{
		binanceSubName: '',
		binanceApiKey: '',
		binanceApiSecret: '',
	},
];
const AdminUser = {
	username: '',
	password: '',
	name: '',
	surname: '',
};

const AsicsModelsArray = [{ name: '', ComputingPower: 0, UsagePower: 0 }];

export default async function CreateAll() {
	Clients.hasMany(Asic);
	Asic.belongsTo(Clients);

	Asic.hasMany(D_hashrate);
	D_hashrate.belongsTo(Asic);
	Asic.hasMany(H_hashrate);
	H_hashrate.belongsTo(Asic);

	await Clients.sync({ alter: true });
	await Admin.sync({ force: true });
	await AsicsModels.sync({ force: true });
	await Asic.sync({ alter: true });
	await D_hashrate.sync({ alter: true });
	await H_hashrate.sync({ alter: true });

	void (await Clients.bulkCreate(ClientsArray));
	void (await Admin.create(AdminUser));
	void (await AsicsModels.bulkCreate(AsicsModelsArray));
}

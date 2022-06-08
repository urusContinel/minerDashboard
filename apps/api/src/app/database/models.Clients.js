import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize.js';

class Clients extends Model {}
Clients.init(
	{
		username: { type: DataTypes.TEXT(), allowNull: true },
		password: { type: DataTypes.TEXT(), allowNull: true },
		surname: { type: DataTypes.TEXT(), allowNull: true },
		name: { type: DataTypes.TEXT('tiny'), allowNull: true },
		patronymic: { type: DataTypes.TEXT(), allowNull: true },
		phone: { type: DataTypes.TEXT('tiny'), allowNull: true },
		binanceApiKey: { type: DataTypes.TEXT(), allowNull: true },
		binanceApiSecret: { type: DataTypes.TEXT(), allowNull: true},
		binanceSubName: { type: DataTypes.TEXT(), allowNull: true },
	},
	{
		sequelize,
		modelName: 'Clients',
		tableName: 'clients',
		paranoid: true
	}
);
export { Clients };

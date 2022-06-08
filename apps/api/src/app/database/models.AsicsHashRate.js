import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize.js';
class D_hashrate extends Model {}
D_hashrate.init(
	{
		time: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		hashrate: { type: DataTypes.DECIMAL(20, 4), allowNull: false },
		reject: { type: DataTypes.INTEGER, allowNull: true },
	},
	{
		sequelize,
		modelName: 'D_hashrate',
		tableName: 'D_hashrate',
		timestamp: false,
		paranoid: true
	}
);

class H_hashrate extends Model {}
H_hashrate.init(
	{
		time: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		hashrate: { type: DataTypes.DECIMAL(20, 4), allowNull: false },
		reject: { type: DataTypes.INTEGER, allowNull: true },
	},
	{
		sequelize,
		modelName: 'H_hashrate',
		tableName: 'H_hashrate',
		timestamp: false,
		paranoid: true
	}
);

export { D_hashrate, H_hashrate };

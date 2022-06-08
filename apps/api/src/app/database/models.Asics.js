import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize.js';
class Asic extends Model {}
Asic.init(
	{
		workerId: { type: DataTypes.TEXT, allowNull: false },
		name: { type: DataTypes.TEXT('tiny'), allowNull: false },
		serial: { type: DataTypes.TEXT('tiny'), allowNull: true },
		hashRate: { type: DataTypes.DECIMAL(20, 4), allowNull: true },
		DayHashRate: { type: DataTypes.DECIMAL(20, 4), allowNull: true },
		rejectRate: { type: DataTypes.DECIMAL(20, 4), allowNull: true },
		lastShareTime: { type: DataTypes.DATE, allowNull: true },
		model: { type: DataTypes.INTEGER, allowNull: true },
		status: { type: DataTypes.INTEGER, defaultValue: 0 },
	},
	{
		sequelize,
		modelName: 'asic',
		tableName: 'asic',
		paranoid: true
	}
);
export { Asic };

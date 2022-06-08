import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize.js';
class AsicsModels extends Model {}
AsicsModels.init(
	{
		name: { type: DataTypes.TEXT('tiny'), allowNull: false },
		ComputingPower: { type: DataTypes.TEXT('tiny'), allowNull: false, comment: 'Только числовое значение Th!' },
		UsagePower: { type: DataTypes.TEXT('tiny'), allowNull: false, comment: 'Только числовое значение Вт!' },
	},
	{
		sequelize,
		modelName: 'asicsModels',
		tableName: 'asicsModels',
		paranoid: true
	}
);
export { AsicsModels };

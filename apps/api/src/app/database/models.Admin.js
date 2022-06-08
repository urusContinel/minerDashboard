import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize.js';

class Admin extends Model {}
Admin.init(
	{
		username: { type: DataTypes.TEXT(), allowNull: true },
		password: { type: DataTypes.TEXT(), allowNull: true },
		surname: { type: DataTypes.TEXT(), allowNull: true },
		name: { type: DataTypes.TEXT('tiny'), allowNull: true },
		patronymic: { type: DataTypes.TEXT(), allowNull: true },
	},
	{
		sequelize,
		modelName: 'Admin',
		tableName: 'admin',
		paranoid: true
	}
);
export { Admin };

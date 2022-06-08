import { Sequelize } from 'sequelize';
import dbConfig from '../config/db.config.js';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: 'mysql',
});
export default sequelize;

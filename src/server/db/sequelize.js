import Sequelize from 'sequelize';
import moment from 'moment';
import sequelizeConfig from './sequelize.config';
import { config } from '../config/boldr';

const ENV = config.env;
const dbConfig = sequelizeConfig[ENV];

export const db = process.env[dbConfig.use_env_variable] ||
`${dbConfig.dialect}://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}/${dbConfig.database}`;

const sequelize = new Sequelize(db, {
  logging: false, // set to console.log to see the raw SQL queries
  timezone: config.timezone,
  omitNull: true,
  define: {
    freezeTableName: true
  }
});

export default sequelize;

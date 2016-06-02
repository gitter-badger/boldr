import logger from '../utils/logger';
import Models from './models';

const sequelize = Models.sequelize;

export default () => {
  sequelize
    .authenticate()
    .then(() => {
      logger.info('Successfully connected to pg database');
    }, (err) => {
      logger.error(`Unable to connect to the sequelize database: ${err}`);
    });
};

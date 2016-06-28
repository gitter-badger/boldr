import { logger } from '../lib';
import Models from './models';

const sequelize = Models.sequelize;

export default () => {
  sequelize
    .authenticate()
    .then(() => {
      logger.info('Established connection to Postgres.');
    }, (err) => {
      logger.error(`Unable to connect to the Postgres database: ${err}`);
    });
};

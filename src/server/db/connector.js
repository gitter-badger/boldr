import { logger } from '../lib';
import Models from './models';
// import { emit } from '../lib/socket';
const sequelize = Models.sequelize;

// function registerSocketEvents(instance, name, secure) {
//   const onSave = document => emit(`${name}:save`, document, secure);
//   instance.afterCreate(onSave);
//   instance.afterUpdate(onSave);
//   instance.afterDelete(document => emit(`${name}:delete`, document, secure));
// }
// registerSocketEvents(Models.User, 'user', true);
export default () => {
  sequelize
    .authenticate()
    .then(() => {
      logger.info('Successfully connected to pg database');
    }, (err) => {
      logger.error(`Unable to connect to the sequelize database: ${err}`);
    });
};

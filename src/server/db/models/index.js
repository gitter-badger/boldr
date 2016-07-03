import fs from 'fs-extra';
import path from 'path';
import Sequelize from 'sequelize';
import { config } from 'config/boldr';

const basename = path.basename(module.filename);
const db = config.db;
let pool = false;

if (db.pool.enabled) {
  pool = {
    maxConnections: db.pool.maxConnections,
    minConnections: db.pool.minConnections,
    maxIdleTime: db.pool.maxIdleTime
  };
}

const sequelize = new Sequelize(db.name, db.user, db.password, {
  host: db.ip,
  dialect: 'postgres',
  pool,
  logging: db.logging
});
fs
  .readdirSync(__dirname)
  .filter((file) =>
    (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

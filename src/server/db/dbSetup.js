import fs from 'fs';
import path from 'path';
import r from './connector';
import logger from '../utils/logger';

const dbName = process.env.RDB_NAME;
const tables = [];

function hasDb(db) {
  return r.dbList().run().then(
    (dbs) => dbs.indexOf(db) !== -1
  );
}

function getDataPath(table) {
  return path.join(__dirname, `../data/${table}.json`);
}

function hasData(table) {
  return fs.existsSync(getDataPath(table));
}

function loadData(table) {
  return JSON.parse(fs.readFileSync(getDataPath(table), 'utf8'));
}

export async function createDb(db) {
  logger.info(`Creating database "${db}"`);

  if (await hasDb(db)) {
    return;
  }

  await r.dbCreate(db).run();
}

export async function dropDb(db) {
  logger.info(`Dropping database "${db}"`);

  if (await hasDb(db)) {
    await r.dbDrop(db).run();
  }
}

export function insertData(table, data) {
  return r.db(dbName).table(table).insert(data).run();
}

function hasTable(table) {
  return r.db(dbName).tableList().run().then(
    (tables) => tables.indexOf(table) !== -1
  );
}

export async function createTable(table) {
  logger.info(`Creating table "${table}"`);

  if (await hasTable(table)) {
    return;
  }

  await r.db(dbName)
    .tableCreate(table)
    .run();
}

export default async function main() {
  try {
    logger.info('Starting setup');

    await createDb(dbName);

    for (let table of tables) {
      await createTable(table);

      if (hasData(table)) {
        logger.info(`Inserting initial data into table "${table}"`);
        const data = loadData(table);
        await insertData(table, data);
      }
    }

    await r.getPoolMaster().drain();

    logger.info('Done');
  } catch (err) {
    logger.error(err.stack ? err.stack : err);
  }
}

import { r } from './connector';
import { TABLE_NAMES } from 'config';
const databases = ['boldr_test'];

export default async function setupDB(isUpdate = false) {
  await Promise.all(databases.map(db => ({ db, isUpdate })).map(reset));
  await r.getPool().drain();
  console.log(`>>Database setup complete!`); // eslint-disable-line
}

async function reset({ db, isUpdate }) {
  const dbList = await r.dbList();
  if (dbList.indexOf(db) === -1) {
    console.log(`>>Creating Database: ${db}`); // eslint-disable-line
    await r.dbCreate(db);
  }
  const tables = await r.db(db).tableList();
  if (!isUpdate) {
    console.log(`>>Dropping tables on: ${db}`); // eslint-disable-line
    await Promise.all(tables.map(table => r.db(db).tableDrop(table)));
  }
  console.log(`>>Creating tables on: ${db}`); // eslint-disable-line
  await Promise.all(TABLE_NAMES.map(table => {
    if (!isUpdate || tables.indexOf(table.name) === -1) {
      return r.db(db).tableCreate(table.name);
    }
    return Promise.resolve(false);
  }));
  console.log(`>>Adding table indices on: ${db}`); // eslint-disable-line
  const tableIndicies = await Promise.all(TABLE_NAMES.map(table => {
    return r.db(db).table(table.name).indexList().run();
  }));
  await Promise.all([...TABLE_NAMES.map((table, i) => {
    const indicies = tableIndicies[i] || [];
    return table.indices.map(index => {
      if (indicies.indexOf(index) === -1) {
        return r.db(db).table(table.name).indexCreate(index).run();
      }
      return Promise.resolve(false);
    });
  })]);
  console.log(`>>Setup complete for: ${db}`); // eslint-disable-line
}

setupDB();

/* eslint-disable no-console */
import r from 'rethinkdb';
import config from 'config';
import { promisify } from 'bluebird';

const rethinkdb = { host: config.RDB_HOST, port: config.RDB_PORT, db: config.RDB_DB };
const DATABASE = config.RDB_DB || 'boldr_dev';
const TABLES = ['accounts', 'profiles', 'groups', 'articles', 'pages', 'tags', 'categories', 'menus',
'sessions', 'articles_tags'];

r.connect(rethinkdb)
.then(conn => {
  console.log(' [-] Database Setup');
  return createDbIfNotExists(conn)
  .then(() => Promise.all(TABLES.map((table) => createTableIfNotExists(conn, table))))
  .then(() => closeConnection(conn));
});

function createDbIfNotExists(conn) {
  return getDbList(conn)
  .then((list) => {
    if (list.indexOf(DATABASE) === -1) {
      return createDatabase(conn);
    } else {
      console.log(' [!] Database already exists:', DATABASE);
      return Promise.resolve(true);
    }
  });
}

function createTableIfNotExists(conn, table) {
  return getTableList(conn)
  .then((list) => {
    if (list.indexOf(table) === -1) {
      return createTable(conn, table);
    } else {
      console.log(' [!] Table already exists:', table);
      return Promise.resolve(true);
    }
  });
}

function getDbList(conn) {
  return r.dbList().run(conn);
}

function getTableList(conn) {
  return r.db(DATABASE).tableList().run(conn);
}

function createDatabase(conn) {
  console.log(' [-] Create Database:', DATABASE);
  return r.dbCreate(DATABASE).run(conn);
}

function createTable(conn, table) {
  console.log(' [-] Create Table:', table);
  return r.db(DATABASE).tableCreate(table).run(conn);
}

function closeConnection(conn) {
  console.log(' [x] Close connection!');
  return conn.close();
}

export async function clearDatabase() {
  const tableList = r.tableList();
  const tables = await promisify(tableList.run, tableList)();

  await tables.map(table => {
    const del = r.table(table).delete();
    return promisify(del.run, del)();
  });
}

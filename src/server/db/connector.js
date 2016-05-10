import rethinkdbDash from 'rethinkdbdash';
import dbConfig from './dbConfig';

export const r = rethinkdbDash(dbConfig);

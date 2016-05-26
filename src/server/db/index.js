import rethinkdbdash from 'rethinkdbdash';
import dbConfig from './dbConfig';

const r = rethinkdbdash(dbConfig);

export default r;

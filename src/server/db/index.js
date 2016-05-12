import rethinkdbdash from 'rethinkdbdash';
import dbConfig from './dbConfig';


export default rethinkdbdash({ host: '10.211.55.7', port: 28015, db: 'boldr' });

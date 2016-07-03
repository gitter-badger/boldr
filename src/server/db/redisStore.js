import redisClient from './redis';
import { Store } from 'koa-session2';

export default class RedisStore extends Store {
  constructor() {
    super();
    this.redis = redisClient;
  }

  async get(sid) {
    const _session = await this.redis.get(`SESSION:${sid}`);

    const getSession = JSON.parse(_session);
    return getSession;
  }

  async set(session, opts) {
    if (!opts.sid) {
      opts.sid = this.getID(24);
    }
    if (typeof session === 'object') {
      session = JSON.stringify(session);
    }
    await this.redis.set(`SESSION:${opts.sid}`, session);
    return opts.sid;
  }

  async destory(sid) {
    return await this.redis.del(sid);
  }
}

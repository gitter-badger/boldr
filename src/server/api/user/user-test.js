import { assert } from 'chai';
import supertest from 'supertest';
import { server } from '../../server';
function request() {
  return supertest(server.listen());
}

describe('API: v1/users', () => {
  it('should return a list of users when calling GET request', (done) => {
    request()
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

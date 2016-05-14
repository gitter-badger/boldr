import { assert } from 'chai';
import supertest from 'supertest';
import { server } from '../../server';

function request() {
  return supertest(server.listen());
}

describe('API: v1/roles', () => {
  it('should return json roles when calling GET request', (done) => {
    request()
      .get('/api/v1/roles')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

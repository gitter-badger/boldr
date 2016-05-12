import { assert } from 'chai';
import supertest from 'supertest';
import { server } from '../../server';

function request() {
  return supertest(server.listen());
}

describe('API: v1/version', () => {
  it('should return json with the application version on GET', (done) => {
    request()
      .get('/api/v1/version')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
    });
});

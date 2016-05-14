import { assert } from 'chai';
import supertest from 'supertest';
import { server } from '../../server';

function request() {
  return supertest(server.listen());
}

describe('API: v1/menus', () => {
  it('should return json menus when calling GET request', (done) => {
    request()
      .get('/api/v1/menus')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

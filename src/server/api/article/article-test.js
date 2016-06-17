import { assert } from 'chai';
import supertest from 'supertest';
import { app } from '../../server';

function request() {
  return supertest(app.listen());
}

describe('API: v1/articles', () => {
  it('should return json articles when calling GET request', (done) => {
    request()
      .get('/api/v1/articles')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);

    // assert.deepEqual(result.body, expected);
  });
});

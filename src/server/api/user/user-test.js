import { assert } from 'chai';
import supertest from 'supertest';
import { server } from '../../server';

describe('API: v1/users', () => {
  const request = supertest(server.listen());

  it('should return a list of users when calling GET request', async () => {
    // const expected = [
    //   { title: 'test article', content: 'Hi' }
    // ];
    const result = await request
                          .get('/api/v1/users')
                          .set('Accept', 'application/json')
                          .expect('Content-Type', /json/)
                          .expect(200);

    // assert.deepEqual(result.body, expected);
  });
});

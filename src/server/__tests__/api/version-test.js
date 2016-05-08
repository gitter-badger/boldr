import { assert } from 'chai';
import supertest from 'supertest';
import { server } from '../../server.dev';

describe('API: v1/version', () => {
  const request = supertest(server.listen());

  it('should return json with the application version on GET', async () => {
    // const expected = [
    //   { title: 'test article', content: 'Hi' }
    // ];
    const result = await request
                          .get('/api/v1/version')
                          .set('Accept', 'application/json')
                          .expect('Content-Type', /json/)
                          .expect(200);

    // assert.deepEqual(result.body, expected);
  });
});

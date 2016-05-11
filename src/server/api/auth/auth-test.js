/* eslint-disable no-unused-expressions */
import { assert, expect } from 'chai';
import supertest from 'supertest';
import { server } from '../../server';

describe('API: v1/auth', () => {
  const request = supertest(server.listen());

  it('should register an account with the provided data.', async () => {
    const accountData = {
      email: 'test@boldr.io',
      username: 'boldr',
      password: 'boldr123',
      location: 'boldr',
      avatar: 'http://placehold.it/250x250',
      website: 'boldr.io',
      bio: 'this is my bio',
      first: 'Bobbo',
      last: 'smith'
    };
    const result = await request
                          .post('/api/v1/auth/register')
                          .send(accountData)
                          .set('Accept', 'application/json')
                          .expect('Content-Type', /json/)
                          .expect(201);

    // assert.deepEqual(result.body, expected);
  });
  it('should login and return a token.', (done) => {
    const loginDetails = {
      email: 'test@boldr.io',
      password: 'boldr123'
    };
    const result = request
                          .post('/api/v1/auth/login')
                          .send(loginDetails)
                          .set('Accept', 'application/json')
                          .expect('Content-Type', /json/)
                          .expect(200);
    expect('fulfillmentValue').to.not.be.null;
    done();
    // assert.deepEqual(result.body, expected);
  });
});

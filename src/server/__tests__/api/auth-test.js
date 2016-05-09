/* eslint-disable no-unused-expressions */
import { assert, expect } from 'chai';
import supertest from 'supertest';
import { server } from '../../server.dev';

describe('API: v1/auth', () => {
  const request = supertest(server.listen());

  it('should register an account with the provided data.', async () => {
    const accountData = {
      email: 'test@boldr.io',
      username: 'boldr',
      password: 'boldr123',
      firstName: 'Michael',
      lastName: 'Scott',
      avatarUrl: 'https://boldr.io',
      bio: 'This is the bio'
    };
    const result = await request
                          .post('/api/v1/auth/register')
                          .send(accountData)
                          .set('Accept', 'application/json')
                          .expect('Content-Type', /json/)
                          .expect(201);

    // assert.deepEqual(result.body, expected);
  });
  it('should login and return a token.', async () => {
    const loginDetails = {
      email: 'test@boldr.io',
      password: 'boldr123'
    };
    const result = await request
                          .post('/api/v1/auth/login')
                          .send(loginDetails)
                          .set('Accept', 'application/json')
                          .expect('Content-Type', /json/)
                          .expect(200);
    expect('token').to.not.be.null;


    // assert.deepEqual(result.body, expected);
  });
});

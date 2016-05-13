/* eslint-disable no-unused-expressions */
import { assert, expect } from 'chai';
import supertest from 'supertest';
import { server } from '../../server';

function request() {
  return supertest(server.listen());
}

describe('API: v1/auth', () => {
  it('should register an account with the provided data.', (done) => {
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
    request()
      .post('/api/v1/auth/register')
      .send(accountData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, done);

    // assert.deepEqual(result.body, expected);
  });
  it('should login and return a token.', (done) => {
    const loginDetails = {
      email: 'test@boldr.io',
      password: 'boldr123'
    };
    request()
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect('token').to.not.be.null;
    done();
  });
});

/* global it, __DEV__, describe, before, post, get */
import { expect, assert } from 'chai';
import { mapUrl } from '../../tools/url';
import app from '../../src/server';
import Request from 'supertest';
const request = Request('http://localhost:3000');
const testUserId = 1;
const testMail = 'test@test.com';
const testPassword = 'test';
const testUsername = 'test';

// const server = app.listen();

describe('API - Auth', () => {
  describe('GET /api/v1/auth/test', () => {
    it('responds with json', done => {
      request
        .get('/api/v1/auth/test')
        .set('Accept', 'application/json')
        .expect('Content-Type', /text\/plain/)
        .expect(200, done);
    });
  });
  describe('POST - Login -- /api/v1/auth/login', () => {
    it('allows the user to login with their credentials', done => {
      request
        .post('/api/v1/auth/login')
        .send({
          email: testMail,
          password: testPassword
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            throw new Error(err);
          }
          assert.isOk('token', 'found the user test');
          done();
        });
    });
    it('wont allow login with invalid email and password', (done) => {
      request
        .post('/api/v1/auth/login')
        .send({
          email: testUsername,
          password: testUsername
        })
        .expect(401, done);
    });
    it('wont login to non-existing user', (done) => {
      request.post('/api/v1/auth/login')
          .send({
            email: 'A@bcd.com',
            password: testPassword
          })
          .expect(401, done);
    });
  });
  describe('POST - Register -- /api/v1/auth/register', () => {
    it('cannot register user without password', (done) => {
      request.post('/api/v1/auth/register')
        .send({
          username: testUsername,
          email: testMail
        })
        .expect(400, done);
    });
    it('cannot register duplicate user', (done) => {
      request.post('/api/v1/auth/register')
        .send({
          username: testUsername,
          password: testPassword,
          email: testMail
        })
        .expect(400, done);
    });
  });
});

/* global it, __DEV__, describe, before, post, get */
import { expect, assert } from 'chai';
import { mapUrl } from '../../tools/url';
import User from '../../src/server/db/models/user';
import app from '../../src/server/server.test';

const request = require('supertest');
const testUserId = 1;
const testMail = 'test@test.com';
const testPassword = 'test';
const testUsername = 'test';

const server = app.listen();

describe('API - Auth', () => {
  describe('GET /api/v1/auth/test', () => {
    it('responds with json', done => {
      request(server)
        .get('/api/v1/auth/test')
        .set('Accept', 'application/json')
        .expect('Content-Type', /text\/plain/)
        .expect(200, done);
    });
  });
  describe('POST - Login -- /api/v1/auth/login', () => {
    it('allows the user to login with their credentials', done => {
      request(server).post('/api/v1/auth/login')
        .send({
          email: testMail,
          password: testPassword
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) throw new Error(err);
          assert.isOk('token', 'found the user test');
          done();
        });
    });
    it('wont allow login with invalid email and password', (done) => {
      request(server)
      .post('/api/v1/auth/login')
          .send({
            email: testUsername,
            password: testUsername
          })
          .expect(401, done);
    });
  });
});

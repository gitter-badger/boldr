/* global it, __DEV__, describe, before, post, get */
import { expect, assert } from 'chai';
import { mapUrl } from '../../tools/url';
import User from '../../src/server/db/models/user';
import app from '../../src/server/server.test';

const request = require('supertest');
const testUserId = 1;
const testUsername = 'test';
const testPassword = 'password';
describe('API - User', () => {
  describe('GET /api/v1/users', () => {
    it('respond with json', done => {
      const server = app.listen();
      request(server)
        .get('/api/v1/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /api/v1/users/1', () => {
    it('get a user by their id and contain a display name', done => {
      const server = app.listen();

      request(server).get(`/api/v1/users/${testUserId}`)
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            if (err) throw new Error(err);
            assert.isOk('display_name', `${testUsername}`, 'found the user test');
            done();
          });
    });
  });
});

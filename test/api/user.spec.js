/* global it, __DEV__, describe, before, post, get */
import { expect, assert } from 'chai';
import { mapUrl } from '../../tools/url';
import app from '../../src/server';
import Request from 'supertest';
const request = Request('http://localhost:3000');
const testUserId = 1;
const testUsername = 'test';
const testPassword = 'password';
describe('API - User', () => {
  describe('GET /api/v1/users', () => {
    it('respond with json', done => {
      request
        .get('/api/v1/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /api/v1/users/1', () => {
    it('get a user by their id and contain a username', done => {
      request.get(`/api/v1/users/${testUserId}`)
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            if (err) throw new Error(err);
            assert.isOk('username', `${testUsername}`, 'found the user test');
            done();
          });
    });
  });
});

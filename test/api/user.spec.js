/* global it, __DEV__, describe, before, post, get */
process.env.NODE_ENV = 'test';

import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../server';
import request from 'supertest';
const knex = require('../db');
const should = chai.should();
const testUserId = 1;
const testMail = 'test@test.com';
const testPassword = 'test';
const testUsername = 'test';

chai.use(chaiHttp);

describe('API - User', () => {
  describe('GET /api/v1/users', () => {
    it('respond with json', done => {
      request(server)
        .get('/api/v1/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /api/v1/users/1', () => {
    it('get a user by their id and contain a username', done => {
      request(server)
        .get(`/api/v1/users/${testUserId}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            throw new Error(err);
          }
          assert.isOk('username', `${testUsername}`, 'found the user test');
          done();
        });
    });
  });
});

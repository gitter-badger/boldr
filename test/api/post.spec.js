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

describe('API - Posts', () => {
  describe('GET /api/v1/posts', () => {
    it('respond with json', done => {
      request(server)
        .get('/api/v1/posts')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});

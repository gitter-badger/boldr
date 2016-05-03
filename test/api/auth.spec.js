/* global it, __DEV__, describe, before, post, get */
process.env.NODE_ENV = 'test';

import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../server';
import request from 'supertest';

const knex = require('../db');
const should = chai.should();
const testUserId = 1;
const testMail = 'testing@test.com';
const testPassword = 'testing';
const testUsername = 'testing';

chai.use(chaiHttp);

describe('API - Auth', () => {
  describe('POST - Register -- /api/v1/auth/register', () => {
    it('should register a user', (done) => {
      request(server)
        .post('/api/v1/auth/register')
        .send({
          username: 'testing',
          password: 'testing',
          displayName: 'bob',
          email: 'testing@test.com',
          firstName: 'test',
          lastName: 'test',
          website: 'www.test.com',
          avatar: 'www.test.com',
          bio: 'hello i am user',
          location: 'narnia',
          facebook: 'user',
          twitter: 'user'
        })
        .expect(201, done);
    });
    it('cannot register user without password', (done) => {
      request(server)
        .post('/api/v1/auth/register')
        .send({
          username: testUsername,
          email: testMail
        })
        .expect(400, done);
    });
    it('cannot register duplicate user', (done) => {
      request(server)
        .post('/api/v1/auth/register')
        .send({
          username: testUsername,
          password: testPassword,
          email: testMail
        })
        .expect(400, done);
    });
  });
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
      request(server)
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
      request(server)
        .post('/api/v1/auth/login')
        .send({
          email: testUsername,
          password: testUsername
        })
        .expect(401, done);
    });
    it('wont login to non-existing user', (done) => {
      request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'A@bcd.com',
          password: testPassword
        })
        .expect(401, done);
    });
  });
});

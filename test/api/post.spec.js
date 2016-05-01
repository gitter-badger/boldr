/* global it, __DEV__, describe, before, post, get */
import { expect } from 'chai';
import { mapUrl } from '../../tools/url';
import app from '../../src/server';
import Request from 'supertest';
const request = Request('http://localhost:3000');

describe('API - Posts', () => {
  describe('GET /api/v1/posts', () => {
    it('respond with json', done => {
      request
        .get('/api/v1/posts')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});

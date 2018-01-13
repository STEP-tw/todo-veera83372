let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
let app = require('../app.js');
let th = require('./testHelper.js');

describe('app', () => {
  describe('GET /bad', () => {
    it('responds with 404', done => {
      request(app, {
        method: 'GET',
        url: '/bad'
      }, (res) => {
        assert.equal(res.statusCode, 404);
        done();
      })
    })
  });
  describe('GET / ', () => {
    it('redirects to login.html if the user not logged in', done => {
      request(app, {
        method: 'GET',
        url: '/'
      }, (res) => {
        th.should_be_redirected_to(res, 'login.html');
        done();
      })
    })
  });
  describe('GET /login', () => {
    it('serves the login page', done => {
      request(app, {
        method: 'GET',
        url: '/login.html'
      }, res => {
        th.status_is_ok(res);
        th.body_contains(res, 'User Login Page');
        th.body_does_not_contain(res, 'login failed');
        th.should_not_have_cookie(res, 'message');
        done();
      })
    })
  });
  describe('GET /home.html', () => {
    it('redirects to login.html if the user not logged in', done => {
      request(app, {
        method: 'GET',
        url: '/'
      }, (res) => {
        th.should_be_redirected_to(res, 'login.html');
        done();
      })
    })
    
  });
  describe('POST /login', () => {
    it('redirects to home.html for valid user', done => {
      request(app, {
        method: 'POST',
        url: '/login',
        body: 'userName=veera'
      }, res => {
        th.should_be_redirected_to(res, 'home.html');
        th.should_not_have_cookie(res, 'message');
        done();
      })
    })
    it('redirects to login.html with message for invalid user', done => {
      request(app, {
        method: 'POST',
        url: '/login',
        body: 'username=badUser'
      }, res => {
        th.should_be_redirected_to(res, '/login.html');
        done();
      })
    })
  });
})

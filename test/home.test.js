const request = require('supertest');
const app = require('../src/Routes/home');

test('Is api online?', () => {
  return request(app).get('/')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Nu Challenge API');
    });
});

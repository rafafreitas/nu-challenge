const request = require('supertest');
const express = require('express');
const auth = require('../src/Routes/auth.js');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(auth)

describe('Auth account', () => {

  it('Create account?', async () => {
    const obj = {
      account: {
        activeCard: true,
        availableLimit: 100
      }
    }

    return request(app).post('/auth')
      .send(obj)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.account).toStrictEqual(obj.account);
        expect(res.body.violations.length).toBe(0);
      }).catch(e => {
        console.log('Error=>', e)
      });
  })

  it('Account already exists?', async () => {
    const obj = {
      account: {
        activeCard: true,
        availableLimit: 100
      }
    }

    return request(app).post('/auth')
      .send(obj)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.account).toStrictEqual(obj.account);
        expect(res.body.violations.length).toBe(1);
        expect(res.body.violations[0]).toBe('account-already-initialized');
      }).catch(e => {
        console.log('Error=>', e)
      });
  })

  it('Validate payload - (activeCard) ?', async () => {
    const payload_verify_activeCard_is_null = { account: { activeCard: null, availableLimit: 100 } }
    const payload_verify_activeCard_is_boolean = { account: { activeCard: 1, availableLimit: 100 } }
    const payload_verify_activeCard_is_undefined = { account: { availableLimit: 100 } }

    await request(app).post('/auth').send(payload_verify_activeCard_is_null).then((res) => {
      expect(res.status).toBe(400);
      expect(res.text).toBe('activeCard is not defined or not boolean');
    })

    await request(app).post('/auth').send(payload_verify_activeCard_is_boolean).then((res) => {
      expect(res.status).toBe(400);
      expect(res.text).toBe('activeCard is not defined or not boolean');
    })

    await request(app).post('/auth').send(payload_verify_activeCard_is_undefined).then((res) => {
      expect(res.status).toBe(400);
      expect(res.text).toBe('activeCard is not defined or not boolean');
    })
  })

  it('Validate payload - (availableLimit) ?', async () => {
    const payload_verify_availableLimit_is_null = { account: { availableLimit: null, activeCard: true } }
    const payload_verify_availableLimit_is_integer = { account: { availableLimit: 'test', activeCard: true } }
    const payload_verify_availableLimit_is_undefined = { account: { activeCard: true } }

    await request(app).post('/auth').send(payload_verify_availableLimit_is_null).then((res) => {
      expect(res.status).toBe(400);
      expect(res.text).toBe('availableLimit is not defined');
    })

    await request(app).post('/auth').send(payload_verify_availableLimit_is_integer).then((res) => {
      expect(res.status).toBe(400);
      expect(res.text).toBe('availableLimit is not integer');
    })

    await request(app).post('/auth').send(payload_verify_availableLimit_is_undefined).then((res) => {
      expect(res.status).toBe(400);
      expect(res.text).toBe('availableLimit is not defined');
    })
  })

  it('Validate payload - (account) ?', async () => {
    const payload_verify = { other: 123 }
    const payload_verify_is_object = { account: 'test' }

    await request(app).post('/auth').send(payload_verify).then((res) => {
      expect(res.status).toBe(500);
    })

    await request(app).post('/auth').send(payload_verify_is_object).then((res) => {
      expect(res.status).toBe(400);
      expect(res.text).toBe('account is not defined or not object');
    })
  })


});

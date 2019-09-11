const request = require('supertest');
const express = require('express');
const transactions = require('../src/Routes/transactions.js');
const Store = require('../src/Config/Store');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(transactions)

// { transaction: { merchant: "Burger King", amount: 20, time: "2019-09-10T10:05:00.000Z" } }

describe('Verify transactions', () => {

  it('Create transaction?', async () => {

    const account = {
      activeCard: true,
      availableLimit: 100
    }

    const obj = {
      transaction: {
        merchant: "Burger King",
        amount: 20,
        time: "2019-09-10T10:05:00.000Z"
      }
    }

    return request(app).post('/transaction')
      .send(obj)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.account).toStrictEqual(account);
        expect(res.body.violations.length).toBe(0);
      }).catch(e => {
        console.log('Error=>', e)
      });
  })

  it('Validate payload - (transaction) ?', async () => {
    const payload_verify = { other: 123 }
    const payload_verify_is_object = { transaction: 'test' }

    await request(app).post('/transaction').send(payload_verify).then((res) => {
      expect(res.status).toBe(500);
    })

    await request(app).post('/transaction').send(payload_verify_is_object).then((res) => {
      expect(res.status).toBe(400);
      expect(res.text).toBe('transaction is not defined or not object');
    })
  })

  it('Validate payload - (merchant) ?', async () => {
    const payload_verify_merchant_is_null = { transaction: { merchant: null } }
    const payload_verify_merchant_is_string = { transaction: { merchant: 123 } }
    const payload_verify_merchant_is_undefined = { transaction: {} }

    await request(app).post('/transaction').send(payload_verify_merchant_is_null).then((res) => {
      expect(res.status).toBe(400);
      expect(res.text).toBe('merchant is not defined');
    })

    await request(app).post('/transaction').send(payload_verify_merchant_is_string).then((res) => {
      expect(res.status).toBe(400);
      expect(res.text).toBe('merchant is not string');
    })

    await request(app).post('/transaction').send(payload_verify_merchant_is_undefined).then((res) => {
      expect(res.status).toBe(400);
      expect(res.text).toBe('merchant is not defined');
    })
  })

  it('Validate payload - (amount) ?', async () => {
    const payload_verify_amount_is_null = { transaction: { merchant: "Burger King", amount: null } }
    const payload_verify_amount_is_integer = { transaction: { merchant: "Burger King", amount: '20' } }
    const payload_verify_amount_is_undefined = { transaction: {merchant: "Burger King"} }

    await request(app).post('/transaction').send(payload_verify_amount_is_null).then((res) => {
      expect(res.status).toBe(400);
      expect(res.text).toBe('amount is not defined');
    })

    await request(app).post('/transaction').send(payload_verify_amount_is_integer).then((res) => {
      expect(res.status).toBe(400);
      expect(res.text).toBe('amount is not integer');
    })

    await request(app).post('/transaction').send(payload_verify_amount_is_undefined).then((res) => {
      expect(res.status).toBe(400);
      expect(res.text).toBe('amount is not defined');
    })
  })

  it('Validate payload - (time) ?', async () => {
    const payload_verify_time_is_null = { transaction: { time: null, merchant: "Burger King", amount: 20 } }
    const payload_verify_time_is_date = { transaction: { time: "2019-00.000Z", merchant: "Burger King", amount: 20 } }
    const payload_verify_time_is_undefined = { transaction: {merchant: "Burger King", amount: 20} }

    await request(app).post('/transaction').send(payload_verify_time_is_null).then((res) => {
      expect(res.status).toBe(400);
      expect(res.text).toBe('time is not defined');
    })

    await request(app).post('/transaction').send(payload_verify_time_is_date).then((res) => {
      expect(res.status).toBe(400);
      expect(res.text).toBe('time is not valid date');
    })

    await request(app).post('/transaction').send(payload_verify_time_is_undefined).then((res) => {
      expect(res.status).toBe(400);
      expect(res.text).toBe('time is not defined');
    })
  })

  it('Validate insert - (Account) ?', async () => {
    const payload_verify_time_is_null = { transaction: { time: null, merchant: "Burger King", amount: 20 } }
    const payload_verify_time_is_date = { transaction: { time: "2019-00.000Z", merchant: "Burger King", amount: 20 } }
    const payload_verify_time_is_undefined = { transaction: {merchant: "Burger King", amount: 20} }

    await request(app).post('/transaction').send(payload_verify_time_is_null).then((res) => {
      expect(res.status).toBe(400);
      expect(res.text).toBe('time is not defined');
    })

    await request(app).post('/transaction').send(payload_verify_time_is_date).then((res) => {
      expect(res.status).toBe(400);
      expect(res.text).toBe('time is not valid date');
    })

    await request(app).post('/transaction').send(payload_verify_time_is_undefined).then((res) => {
      expect(res.status).toBe(400);
      expect(res.text).toBe('time is not defined');
    })
  })


});

const Controller = require('../Controller/Auth')
const express = require('express');

const app = express()

app.post('/auth', (req, resp) => {
  try {
    const obj = Controller.setClient(req.body.account)
    resp.status(obj.status).send(obj.message);
  } catch (e) {
    resp.status(500).send(e.message);
  }
})

module.exports = app

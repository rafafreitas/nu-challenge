const Controller = require('../Controller/Auth')
const express = require('express');

const app = express()

app.post('/auth', (req, resp) => {

  const obj = Controller.setClient(req.body.account)
  resp.status(obj.status).send(obj.message);

})

module.exports = app

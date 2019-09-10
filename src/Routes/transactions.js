const Controller = require('../Controller/Transaction')
const express = require('express');

const app = express()

app.post('/transaction', (req, resp) => {

  const obj = Controller.setTransaction(req.body.transaction)
  resp.status(obj.status).send(obj.message);

})

module.exports = app

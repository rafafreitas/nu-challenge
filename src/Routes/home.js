const express = require('express');
const app = express()

app.get('/', (req, resp) => resp.send({ status: 200, message: 'Nu Challenge API' }))

module.exports = app

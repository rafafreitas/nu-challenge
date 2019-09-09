const express = require('express');
const app = express()

app.post('/auth', (req, resp) => {
  resp.send('User create')
})

module.exports = app

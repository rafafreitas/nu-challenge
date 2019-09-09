const express = require('express');
const Home = require('./home.js')
const Auth = require('./auth.js')

const app = express()
app.use(Home)
app.use(Auth)

module.exports = app

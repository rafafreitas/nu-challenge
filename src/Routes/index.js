const express = require('express');
const Home = require('./home.js')
const Auth = require('./auth.js')
const Transaction = require('./transactions.js')

const app = express()
app.use(Home)
app.use(Auth)
app.use(Transaction)

module.exports = app

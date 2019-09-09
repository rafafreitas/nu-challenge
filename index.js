const express = require('express');
const Routers = require('./src/Routes')
const Store = require('./src/Config/Store')
const app = express()

Store.clear()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(3000, () => {})
app.use(Routers)



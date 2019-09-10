const express = require('express');
const Routers = require('./src/Routes')
const Store = require('./src/Config/Store')
const app = express()
const PORT = 3000
Store.clear()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
app.use(Routers)



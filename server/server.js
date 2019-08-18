require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.SERVER_PORT || 5000

const itemRouter = require('./routers/router-item')
const categoryRouter = require('./routers/router-category')

app.use((req, res, next) => {
  console.log(req.url)
  next()
})

app.use('/api/items', itemRouter)
app.use('/api/categories', categoryRouter)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))

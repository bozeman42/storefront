require('dotenv').config()
const express = require('express')
const app = express()

const bodyParser = require('body-parser')

const itemRouter = require('./routers/router-item')
const categoryRouter = require('./routers/router-category')
const uploadRouter = require('./routers/router-upload')

const PORT = process.env.SERVER_PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
  console.log(req.url)
  next()
})

app.use('/api/upload', uploadRouter)
app.use('/api/items', itemRouter)
app.use('/api/categories', categoryRouter)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))

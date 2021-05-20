require('dotenv').config()
const path = require('path')
const express = require('express')

const app = express()

const itemRouter = require('./routers/router-item')
const categoryRouter = require('./routers/router-category')
const uploadRouter = require('./routers/router-upload')
const imageRouter = require('./routers/router-image')

const auth = require('./modules/fakeAuth')


const PORT = process.env.SERVER_PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use((req, res, next) => {
  console.log(req.url)
  next()
})

app.use('/api/images', express.static(path.join(__dirname, 'public/images')))
app.use('/api/images', auth, imageRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/items', itemRouter)
app.use('/api/categories', categoryRouter)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))

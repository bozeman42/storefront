require('dotenv').config()
const express = require('express')
const app = express()

const PORT = process.env.SERVER_PORT || 5000
let count = 0
const items = [
  {
    id: 0,
    categories: [
      'sticker',
      'dragon',
      'cute',
      'critter'
    ],
    name: 'A dragon sticker!',
    description: 'THIS IS A DESCRIPTION!'
  },
  {
    id: 0,
    categories: [
      'plush',
      'dragon',
      'cute',
      'critter'
    ],
    name: 'A dragon plooooosh!',
  },
  {
    id: 1,
    categories: [
      'sticker',
      'fox',
      'cute',
      'critter'
    ],
    name: 'A fox sticker!',
  }
]

app.get('/api/items', (req,res) => {
  res.send({items, count: count++})
})

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))
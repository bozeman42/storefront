require('dotenv').config()
const express = require('express')
const app = express()
require('./modules/pool.js')
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
    id: 1,
    categories: [
      'plush',
      'dragon',
      'cute',
      'critter'
    ],
    name: 'A dragon plooooosh!',
  },
  {
    id: 2,
    categories: [
      'sticker',
      'fox',
      'cute',
      'critter'
    ],
    name: 'A fox sticker!',
  },
  {
    id: 3,
    categories: [
      'sticker',
      'fox',
      'dragon',
      'cute',
      'critter'
    ],
    name: 'A dragon-fox sticker!',
  },
  {
    id: 4,
    categories: [
      'plush',
      'fox',
      'cute',
      'critter'
    ],
    name: 'A fox plush!',
  }
]

app.get('/api/items', (req,res) => {
  res.send({items, count: count++})
})

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))
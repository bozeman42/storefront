const router = new require('express').Router()

const pool = require('../modules/pool.js')
const logToFile = require('../modules/logger')

const addItem = require('../modules/addItem')
const ItemModel = require('../models/ItemModel')

router.get('/', (req, res) => {
  pool.connect().then(client => {
    client
    .query(`SELECT * FROM item_info;`)
    .then(result => {
        const items = result.rows.map(item => new ItemModel(item))
        console.log(items)
        res.send(items)
      })
      .catch(e => {
        console.log(e)
        logToFile(e.stack)
        res.status(500).send(e)
      })
      .finally(() => client.release())
  })
})

router.post('/', (req, res) => {
  const item = req.body
  console.log(item)
  try {
    addItem(item)
      .then(results => {
        res.sendStatus(201)
      })
      .catch(e => {
        console.log(e)
        logToFile(e.stack)
        res.status(500).send({ error: 'Failed to add item.' })
      })
  } catch (e) {
    console.error(e)
    logToFile(e.stack)
    res.status(500).send('Something went wrong.')
  }
})

router.delete('/:itemId', (req, res) => {
  // AUTHORIZE THIS ROUTE
  console.log('deleting', req.params)
  res.sendStatus(200)
})

module.exports = router

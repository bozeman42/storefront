const router = new require('express').Router()

const pool = require('../modules/pool.js')

const addItem = require('../modules/addItem')

router.get('/', (req, res) => {
  pool.connect().then(client => {
    client
      .query(`SELECT * FROM item_info;`)
      .then(result => {
        res.send(result.rows)
      })
      .catch(e => {
        console.log(e)
        res.status(500).send(e)
      })
      .finally(() => client.release())
  })
})

router.post('/', (req, res) => {
  const item = req.body
  try {
    addItem(item)
    .then(results => {
      console.log(results)
      res.send(results)
    })
    .catch(e => {
      console.log(e)
      res.status(500).send({error: 'Failed to add item.'})
    })
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong.')
  }
})

module.exports = router

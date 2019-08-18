const router = new require('express').Router()

const pool = require('../modules/pool.js')

router.get('/', (req, res) => {
  console.log('in the item router')
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
  console.log(req.body)
  res.sendStatus(201)
})

module.exports = router

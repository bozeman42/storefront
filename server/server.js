require('dotenv').config()
const express = require('express')
const app = express()
const pool = require('./modules/pool.js')
const PORT = process.env.SERVER_PORT || 5000
let count = 0

app.get('/api/items', (req,res) => {
  pool.connect()
  .then(client => {
    client.query(`SELECT * FROM item_info;`)
    .then(result => {
      res.send({items: result.rows, count})
    })
    .catch(e => {
      console.log(e)
      res.status(500).send(e)
    })
    .finally(() => client.release())
  })

})

app.get('/api/categories', (req, res) => {
  pool.connect()
  .then(client => {
    const categoryQuery = `
    SELECT category_id as id, name as category FROM
    categories RIGHT JOIN items_categories USING (category_id);`
    client.query(categoryQuery)
    .then(result => {
      res.send(result.rows)
    })
    .catch(e => {
      res.status(500).send(e)
    })
    .finally(() => client.release())
  })
})

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))
const router = new require('express').Router()

const pool = require('../modules/pool.js')

router.get('/', (req, res) => {
  pool.connect().then(client => {
    const categoryQuery = `
    SELECT category_id as id, name as category FROM
    categories RIGHT JOIN items_categories USING (category_id);`
    client
      .query(categoryQuery)
      .then(result => {
        res.send(result.rows)
      })
      .catch(e => {
        res.status(500).send(e)
      })
      .finally(() => client.release())
  })
})

module.exports = router

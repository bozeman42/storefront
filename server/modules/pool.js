const { Pool, Client } = require('pg')

const pool = new Pool()

const getNow = async () => {
  const res = await pool.query('SELECT NOW()')
  console.log(res)
  await pool.end()
}

getNow()

module.exports = pool
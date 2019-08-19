const pool = require('./pool')

const addItem = item => {
  const { 
    name,
    price,
    description,
    materials,
    categories,
    quantity
  } = item
  return pool.connect().then(client => {
    return client
      .query(
      `INSERT INTO items (name, description, materials, price, quantity) VALUES
      ($1, $2, $3, $4, $5) RETURNING item_id`,
      [
        name,
        description,
        materials,
        price,
        quantity
      ])
      .then(result => {
        const itemId = result.rows[0].item_id
        return addCategories(categories, itemId, client)
      })
      .finally(() => client.release())
  })
}

const addCategories = (categories, itemId, client) => {
  categories.forEach(category => {

  })
}

module.exports = addItem
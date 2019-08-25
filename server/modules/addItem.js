const pool = require('./pool')
const utilities = require('./utilities')

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
      .finally(() => {
        client.release()
      })
  })
}

const addCategories = async (categories, itemId, client) => {
  const categoryIds = await categories.reduce(async (previousPromise, category) => {
    const ids = await previousPromise
    let result = await client.query(`
      INSERT INTO categories (name) values ($1) ON CONFLICT (name) DO NOTHING RETURNING category_id ;
    `, [category])
    if (result.rows.length === 1) return [...ids, result.rows[0].category_id]
    result = await client.query(`
      SELECT category_id FROM categories WHERE name = $1;
    `, [category])
    console.log(ids)
    return [...ids, result.rows[0].category_id]
  }, Promise.resolve([]))
  
  // at this point the categories are in the database and you have their category_ids

  await categoryIds.forEach(categoryId => {
    client.query(
      `INSERT INTO items_categories (category_id, item_id) values ($1, $2);`,
      [categoryId, itemId]
    )
  })
}

module.exports = addItem
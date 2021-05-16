const pool = require('./pool')

const addItem = item => {
  const { 
    name,
    price,
    description,
    materials,
    categories,
    images,
    quantity
  } = item
  return pool.connect().then(async client => {
    await client.query('BEGIN;')
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
      .then(async result => {
        const itemId = result.rows[0].item_id
        await Promise.all([
          addCategories(categories, itemId, client),
          addImages(images, itemId, client)
        ])
        return client.query('COMMIT;')
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

    return [...ids, result.rows[0].category_id]
  }, Promise.resolve([]))
  
  // at this point the categories are in the database and you have their category_ids

  for (let categoryId of categoryIds) {
    await client.query(
      `INSERT INTO items_categories (category_id, item_id) values ($1, $2);`,
      [categoryId, itemId]
    )
  }
}

const addImages = async (images, itemId, client) => {
  const imageIds = await images.reduce(async (previousPromise, image) => {
    const ids = await previousPromise

    let result = await client.query(`
      INSERT INTO images (url) values ($1) RETURNING image_id ;
    `, [image])

    if (result.rows.length === 1) return [...ids, result.rows[0].image_id]

    result = await client.query(`
      SELECT image_id FROM images WHERE name = $1;
    `, [image])

    return [...ids, result.rows[0].image_id]
  }, Promise.resolve([]))
  
  // at this point the images are in the database and you have their image_ids

  for (let imageId of imageIds) {
    await client.query(
      `INSERT INTO items_images (image_id, item_id) values ($1, $2);`,
      [imageId, itemId]
    )
  }
}


module.exports = addItem
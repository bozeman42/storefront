const pool = require('./pool')
const deleteImage = require('./deleteImage')


const deleteItem = async id => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN TRANSACTION;')
    await client.query(
      `DELETE FROM items_categories where item_id = $1;`,
      [id]
    )
    await client.query(
      `delete from categories
        where category_id
        not in (select ic.category_id from items_categories ic);`
    )
    await client.query(
      `DELETE FROM items_images where item_id = $1;`,
      [id]
    )
    const imageResult = await client.query(
      `select url from images
        where image_id
        not in (select ii.image_id from items_images ii);`
    )
    const imageNames = imageResult.rows.map(row => row.url)

    imageNames.forEach(filename => {
      deleteImage(filename, err => {
        if (err && err.code === 'ENOENT') {
          console.log(`Image ${filename} not found`)
        } else if (err) {
          throw new Error('There was an error deleting this file.')
        } else {
          console.log(`Deleted ${filename}`)
        }
      })
    })
    await client.query(
      `delete from images
        where image_id
        not in (select ii.image_id from items_images ii);`
    )
    await client.query(
      `delete from items where item_id = $1;`,
      [id]
    )
    client.query('COMMIT TRANSACTION;')
  } catch (e) {
    console.error(e)
    client.query('ROLLBACK TRANSACTION;')
    throw new Error(`Deleting item ${id} failed`)
  } finally {
    client.release()
  }
}

module.exports = {
  deleteItem
}

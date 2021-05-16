const path = require('path')
const fs = require('fs')

const deleteImage = (filename, callback) => {
  console.log(`Deleting ${filename}.`)
  fs.unlink(path.join(__dirname,'../public/images/', path.basename(filename)), callback)
}

module.exports = deleteImage
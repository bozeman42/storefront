const fs = require('fs')

function renamePromise (oldPath, newPath) {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, err => {
      if (err) reject(err)
      resolve('Rename successful.')
    })
  })
}

module.exports = renamePromise

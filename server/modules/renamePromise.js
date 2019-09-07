const fs = require('fs')
const path = require('path')

function renamePromise (oldPath, newPath) {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, err => {
      if (err) reject(new Error(err))
      resolve(path.basename(newPath))
    })
  })
}

module.exports = renamePromise

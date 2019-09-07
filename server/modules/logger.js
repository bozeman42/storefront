const fs = require('fs')
const path = require('path')

const logStream = fs.createWriteStream(path.join(__dirname, '../logs/log.txt'), { flags: 'a' })

const logToFile = message => {
  const date = new Date()
  logStream.write(`${date.toISOString()}\n${message}\n\n`)
}

module.exports = logToFile
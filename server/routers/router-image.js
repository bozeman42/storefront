const express = require('express')
const router = new express.Router()
const path = require('path')
const fs = require('fs')

router.delete('/:filename', (req, res) => {
  const { filename } = req.params
  console.log(`Deleting ${filename}.`)
  fs.unlink(path.join(__dirname,'../public/images/', path.basename(filename)), (err) => {
    if (err && err.code === 'ENOENT') return res.status(404).send('File not found.')

    if (err) return res.status(500).send('There was an error deleting this file.')

    res.sendStatus(200)
  })
})

module.exports = router
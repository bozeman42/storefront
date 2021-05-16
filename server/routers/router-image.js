const express = require('express')
const router = new express.Router()

const deleteImage = require('../modules/deleteImage')

router.delete('/:filename', (req, res) => {
  const { filename } = req.params
  deleteImage(filename, err => {
    if (err && err.code === 'ENOENT') return res.status(404).send('File not found.')
    if (err) return res.status(500).send('There was an error deleting this file.')

    res.sendStatus(200)
  })
})

module.exports = router
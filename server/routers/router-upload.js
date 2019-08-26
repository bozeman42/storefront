// THIS ROUTER SHOULD BE BEHIND AUTHENTICATION

const router = new require('express').Router()
const multer = require('multer')
const path = require('path')
const renamePromise = require('../modules/renamePromise')

const tempDir = path.join(__dirname, '../uploads/temp')

const upload = multer({
  dest: tempDir
})

router.post('/images', upload.array('images'), (req, res) => {
  // TO DO: have authentication before this router

  Promise
    .all(req.files
      .map(file => {
        const tempPath = file.path
        const targetPath = path.join(__dirname, '../uploads/') + `${file.filename}${path.extname(file.originalname)}`
        return renamePromise(tempPath, targetPath)
      })
    )
    .then(result => {
      console.log(result)
      res.sendStatus(201)
    })
    .catch(e => {
      console.log(e)
      res.status(500).send('Failed to upload files properly')
    })
})

module.exports = router
const router = new require('express').Router()

router.post('/image', (req, res) => {
  console.log(req)
})

module.exports = router
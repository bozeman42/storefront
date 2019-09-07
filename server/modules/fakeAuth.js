module.exports = (req, res, next) => {
  console.log('authorize route', req.url)
  next()
}
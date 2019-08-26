const buildParameters = valueArray => {
  return Array.isArray(valueArray)
    ? valueArray.map((item, index) => {
      return `$${index + 1}`
    })
    : ['$1']
}

module.exports = {
  buildParameters
}
export function validatePrice(value) {
  const result = Math.round(parseFloat(value) * 100) / 100
  if ( isNaN(result) || result < 0 ) return 0
  console.log(result)
  return result
}

export function validateQuantity(value) {
  return value <= 0 ? 0 : Math.floor(value)
}

export function parseCategories(categories) {
  return categories
    .split(',')
    .map(category => category.trim())
    .filter(category => category !== '')
    .filter((category, index, array) => index === array.indexOf(category))
}
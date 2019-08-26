const getCategories = async () => {
  const response = await fetch('/api/categories')
  return response.json()
}

export default getCategories

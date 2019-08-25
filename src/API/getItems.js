const getItems = async () => {
  const response = await fetch('/api/items')
  return response.json()
}

export default getItems

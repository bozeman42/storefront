const postItem = item => {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(item)
  }
  
  return fetch('/api/items', options)
}

export default postItem
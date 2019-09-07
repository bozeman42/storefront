function deleteImage (filename) {
  return fetch(`/api/images/${filename}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.status === 200) {
      return response
    } else {
      console.log(response)
      throw new Error('Image deletion failed.', response.statusText)
    }
  })
}

export default deleteImage
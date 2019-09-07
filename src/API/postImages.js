const postImages = files => {
  const formData = new FormData()
  const fileArray = Array.from(files)

  fileArray.forEach(file => formData.append('images', file))

  return fetch('/api/upload/images', {
    method: 'POST',
    body: formData
  })
}

export default postImages
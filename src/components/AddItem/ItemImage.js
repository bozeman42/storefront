import { useState } from 'react'

export const ItemImage = ({ alt, onClick, deleting, ...props }) => {
  const [loading, setLoading] = useState(true)
  const image = <img alt={alt} {...props} onLoad={() => setLoading(false)} />
  return (
    <div>
      <span>{image}{loading && `Loading...`}</span>
      <button disabled={deleting} onClick={onClick}>Delete</button>
    </div>
  )
}
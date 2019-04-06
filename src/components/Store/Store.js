import React from 'react'

const Store = ({ items, setCategory }) => {
  return (
    <div className='item-list'>
      {items.map(item => (
        <div className='store-item'>
          <img className='item-image' src={item.image} />
          <p>{item.name}</p>
          <p>{item.description}</p>
        </div>
      ))}
  </div>
  )
}

export default Store

import React from 'react'

const ItemList = ({items}) => (
  <div className='item-list'>
    {items.map(item => (
      <div className='store-item' key={item.id}>
        <img className='item-image' alt='Phil Murray' src='https://fillmurray.com/150/150' />
        <p>{item.name}</p>
        <p>{item.description}</p>
      </div>
    ))}
  </div>
)

export default ItemList

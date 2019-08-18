import React from 'react'

const Item = ({id, name, description, price}) => (
  <div className='store-item' key={id}>
    <img className='item-image' alt='Phil Murray' src='https://www.fillmurray.com/150/150' />
    <p>{name}</p>
    <p>{description}</p>
    <p><strong>${price / 100}</strong></p>
  </div>
)

const ItemList = ({items}) => (
  <div className='item-list'>
    {items.map(item => <Item {...item} />)}
  </div>
)

export default ItemList

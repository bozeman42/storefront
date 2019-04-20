import React from 'react'

const Store = ({ items, setCategory }) => {
  return (
    <div className='store'>
      <div className='item-list'>
        {items.map(item => (
          <div className='store-item' key={item.id}>
            <img className='item-image' src={item.image} />
            <p>{item.name}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Store

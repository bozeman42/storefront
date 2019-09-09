import React from 'react'

const renderQuantity = quantity => {
  if (quantity === 0) return <p>Out of stock</p>
  return <p>{quantity} in stock</p>
}

const Item = ({ id, name, description, price, quantity, categories, images }) => (
  <div className='store-item' >
    <img
      className='item-image'
      src={`api/images/${images[0].image}`}
    />
    <p>{name}</p>
    <p>{description}</p>
    <p>
      <strong>${price / 100}</strong>
    </p>
    {renderQuantity(quantity)}
    {renderCategories(categories)}
  </div>
)

const renderCategories = categories => {
  return categories.map(({ id, category }) => {
    return <p key={id}>{category}</p>
  })
}

const ItemList = ({ items }) => {
  console.log(items)
  return (
  <div className='item-list'>
    {items.map(item => (
      <Item key={item.id} {...item} />
    ))}
  </div>
)}

export default ItemList

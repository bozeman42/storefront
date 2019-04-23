import React from 'react'
import { ItemList } from '../ItemList'

const Store = ({ items, setCategory }) => {
  return (
    <div className='store'>
      <ItemList items={items} />
    </div>
  )
}

export default Store

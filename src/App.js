import React, { useState, useEffect } from 'react';
import Header from './components/Header'
import Store from './components/Store'
import logo from './logo.svg'
import './App.css';

const items = [
  {
    id: 0,
    categories: [
      'sticker',
      'dragon',
      'cute',
      'critter'
    ],
    name: 'A dragon sticker!',
    image: logo,
    description: 'THIS IS A DESCRIPTION!'
  },
  {
    id: 1,
    categories: [
      'plush',
      'dragon',
      'cute',
      'critter'
    ],
    name: 'A dragon plooooosh!',
    image: logo
  },
  {
    id: 2,
    categories: [
      'sticker',
      'fox',
      'cute',
      'critter'
    ],
    name: 'A fox sticker!',
    image: logo
  }
]

const App = () => {
  const [category, setCategory] = useState('all')
  const [ displayItems, setDisplayItems ] = useState(items)
  useEffect(() => {
    if (category !== 'all') {
      setDisplayItems(items.filter(item => {
        return item.categories.includes(category)
      }))
    } else {
      setDisplayItems(items)
    }
  }, [category])
  return (
    <div className="App">
      <Header setCategory={setCategory} />
      <Store items={displayItems} setCategory={setCategory} />
    </div>
  )
}

export default App;

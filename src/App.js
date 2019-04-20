import React, { useState, useEffect } from 'react';
import Header from './components/Header'
import Store from './components/Store'
import './App.css';


const App = () => {
  const [category, setCategory] = useState('all')
  const [items, setItems ] = useState([])
  const [ reload, setReload ] = useState(true)
  const [ displayItems, setDisplayItems ] = useState([])
  const [ count, setCount ] = useState(0)
  useEffect(() => {
    fetch('/api/items')
    .then(response => response.json())
    .then(json => {
      setItems(json.items)
      console.table(json)
      setCount(json.count)
    })
    .catch(e => alert(e.message))
  }, [reload])
  useEffect(() => {
    if (category !== 'all') {
      setDisplayItems(items.filter(item => {
        return item.categories.includes(category)
      }))
    } else {
      setDisplayItems(items)
    }
  }, [category, items])
  return (
    <div className="App">
      <Header setCategory={setCategory} />
      <Store items={displayItems} setCategory={setCategory} />
    </div>
  )
}

export default App;

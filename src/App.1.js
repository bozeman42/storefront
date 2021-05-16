import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import Store from './components/Store'
import Login from './components/Login'
import AddItem from './components/AddItem'

import './App.css';
import { useItems } from './API/getItems';
import { useCategories } from './API/getCategories'

const App = () => {
  const { category, categories, setCategory } = useCategories()
  const { items, loading, error } = useItems()
  const [ displayItems, setDisplayItems ] = useState([])
  useEffect(() => {
    if (category !== 'all') {
      setDisplayItems(items.filter(item => {
        return item.categories
        .map(category => category.category.toLowerCase())
        .includes(category.toLowerCase())
      }))
    } else {
      setDisplayItems(items)
    }
  }, [category, items])
  return (
    <div className="App">
      <Router>
        <Header setCategory={setCategory} />
        <Route path='/' exact>
          <Store loading={loading} itemsError={error} items={displayItems} categories={categories} setCategory={setCategory} />
        </Route>
        <Route path='/login' component={Login} />
        <Route path='/admin/addItem' component={AddItem} />
      </Router>
    </div>
  )
}

export default App;

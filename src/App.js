import React, { Component } from 'react';
import Header from './components/Header'
import Store from './components/Store'
import Nav from './components/Nav'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      count: 0,
      category: 'all',
      categories: []
    }
    this.setCategory = this.setCategory.bind(this)
  }
  componentDidMount () {
    fetch('/api/categories')
    .then(response => response.json())
    .then(categories => {
      this.setState({
        categories
      })
    })
    .catch(e => console.log(e))
    fetch('/api/items')
    .then(response => response.json())
    .then(json => {
      const { items, count } = json
      this.setState({
        items,
        count
      })
    })
    .catch(e => alert(e.message))
  }

  setCategory(category) {
    return () => {
      this.setState({
        category
      })
    }
  }

  render () {
    const {state: { items, count, category, categories }, setCategory} = this
    const displayItems = category === 'all' ? items : items.filter(item => {
      return item.categories.includes(category)
    })
    return (
      <div className="App">
        <Header setCategory={setCategory} />
        <Nav setCategory={setCategory} categories={categories} />
        <Store items={displayItems} setCategory={setCategory} />
        <div>{count}</div>
      </div>
    )
  }
}

export default App;

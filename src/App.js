import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Store from './components/Store'
import Nav from './components/Nav'
import AddItem from './components/AddItem'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
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
      const { items } = json
      this.setState({
        items
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
    const {state: { items, category, categories }, setCategory} = this
    const displayItems = category === 'all' ? items : items.filter(item => {
      return item.categories.includes(category)
    })
    return (
      <div className="App">
      <Router>
        <Header setCategory={setCategory} />
        <Nav setCategory={setCategory} categories={categories} />
        <Route path='/' exact render={() => <Store items={displayItems} setCategory={setCategory} />} />
        <Route path='/addItem' component={AddItem} />
      </Router>
      </div>
    )
  }
}

export default App;

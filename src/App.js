import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Store from './components/Store'
import AddItem from './components/AddItem'
import Login from './components/Login'
import './App.css'

import { getItems, getCategories } from './API'

import fakeAuth from './fakeAuth'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      category: 'all',
      categories: []
    }

    this.initializeStoreInfo = this.initializeStoreInfo.bind(this)
    this.setCategory = this.setCategory.bind(this)
  }

  componentDidMount() {
    this.initializeStoreInfo()
  }

  initializeStoreInfo () {
    this.getItems()
    this.getCategories()
  }

  getCategories() {
    getCategories()
      .then(categories => {
        this.setState({
          categories
        })
      })
      .catch(e => console.log(e))
  }

  getItems () {
    getItems()
      .then(items => {
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

  render() {
    const {
      state: { items, category, categories },
      setCategory
    } = this
    const displayItems =
      category === 'all'
        ? items
        : items.filter(item => {
            return item.categories
            .map(category => category.category.toLowerCase())
            .includes(category.toLowerCase())
          })
    return (
      <div className='App'>
        <Router>
          <Header setCategory={setCategory} />
          <Route
            path='/'
            exact
            render={() => (
              <Store
                items={displayItems}
                setCategory={setCategory}
                categories={categories}
              />
            )}
          />
          <Route path='/login' component={Login} />
          <Route path='/admin/addItem' render={() => <AddItem initializeStoreInfo={this.initializeStoreInfo} />} />
        </Router>
      </div>
    )
  }
}

export default App

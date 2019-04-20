import React, { Component } from 'react';
import Header from './components/Header'
import Store from './components/Store'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      count: 0,
      category: 'all'
    }
    this.setCategory = this.setCategory.bind(this)
  }
  componentDidMount () {
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
    this.setState({
      category
    })
  }

  render () {
    const {state: { items, count, category }, setCategory} = this
    const displayItems = category === 'all' ? items : items.filter(item => {
      return item.categories.includes(category)
    })
    return (
      <div className="App">
        <Header setCategory={setCategory} />
        <Store items={displayItems} setCategory={setCategory} />
        <div>{count}</div>
      </div>
    )
  }
}

export default App;

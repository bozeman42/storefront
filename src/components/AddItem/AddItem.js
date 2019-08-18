import React, { Component } from 'react'
import { postItem } from '../../API/postItem'

class AddItem extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      materials: '',
      displayPrice: '',
      categories: '',
      loading: false
    }
    this.handleInput = this.handleInput.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  dataPrice() {
    const { displayPrice } = this.state
    return !isNaN(parseFloat(displayPrice))
      ? Math.round(parseFloat(displayPrice) * 100)
      : 0
  }

  validatePrice(value) {
    const result = Math.round(parseFloat(value) * 100) / 100
    return isNaN(result) ? 0 : result
  }

  parseCategories(categories) {
    return categories
      .split(',')
      .map(category => category.trim())
      .filter(category => category !== '')
  }

  handleInput(e) {
    const field = e.target.name
    console.log(field)
    if (field === 'dataPrice') {
      this.setState({
        displayPrice: this.validatePrice(e.target.value)
      })
    } else {
      this.setState({
        [field]: e.target.value
      })
    }
  }

  renderCategory(category) {
    return (
      <div className='category-chip'>
        {category}
      </div>
    )
  }

  onSubmit(e) {
    e.preventDefault()
    const{
      name,
      materials,
      description,
      categories
    } = this.state

    const itemToPost = {
      name,
      price: this.dataPrice(),
      description,
      materials,
      categories: this.parseCategories(categories)
    }

    postItem(itemToPost)
    .then(response => {
      console.log(response)
    })
    .catch(e => console.error(e))
  }

  render() {
    const { name, description, materials, displayPrice, categories } = this.state

    return (
      <div id='add-item-page'>
        <h2>Add an item</h2>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor='item-name-input'>Name </label>
            <input
              type='text'
              id='item-name-input'
              name='name'
              value={name}
              onChange={this.handleInput}
              required
            />
          </div>
          <div>
            <label htmlFor='price-input'>Price </label>
            <input
              id='price-input'
              type='number'
              name='displayPrice'
              value={displayPrice}
              step={0.01}
              onChange={this.handleInput}
              required
            />
          </div>
          <div>
            <label htmlFor='materials-input'>Materials </label>
            <textarea
              id='materials-input'
              type='text'
              name='materials'
              value={materials}
              onChange={this.handleInput}
            />
          </div>
          <div>
            <label htmlFor='desc-input'>Description </label>
            <textarea
              id='desc-input'
              type='text'
              name='description'
              value={description}
              onChange={this.handleInput}
            />
          </div>
          <div>
            <label htmlFor='category-input'>
              Categories (comma separated):{' '}
            </label>
            <textarea
              id='category-input'
              type='text'
              name='categories'
              value={categories}
              onChange={this.handleInput}
            />
          </div>
          <button type='submit'>Submit</button>
        </form>
        <div>
          <dl>
            <dt>Name</dt>
            <dd>{name}</dd>
            <dt>Description</dt>
            <dd>{description}</dd>
            <dt>Price</dt>
            <dd>{displayPrice}</dd>
            <dt>Price stored in database</dt>
            <dd>{this.dataPrice()}</dd>
            <dt>Categories</dt>
            <dd>
              {this.parseCategories(categories).map(category => this.renderCategory(category))}
            </dd>
          </dl>
        </div>
      </div>
    )
  }
}

export default AddItem

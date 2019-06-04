import React, { Component } from "react";

class AddItem extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      materials: "",
      displayPrice: "",
      loading: false
    };
    this.handleInput = this.handleInput.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  dataPrice() {
    const { displayPrice } = this.state;
    return !isNaN(parseFloat(displayPrice))
      ? Math.round(parseFloat(displayPrice) * 100)
      : 0
  }

  validatePrice(value) {
    const result = (Math.round(parseFloat(value) * 100) / 100)
    return isNaN(result) ? 0 : result
  }

  handleInput (e) {
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

  onSubmit(e) {
    e.preventDefault()
  }

  render() {
    const {
      name,
      description,
      materials,
      displayPrice
    } = this.state

    return (
      <div id="add-item-page">
        <h2>Add an item</h2>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="item-name-input">Name</label>
            <input
              type="text"
              id="item-name-input"
              name='name'
              value={name}
              onChange={this.handleInput}
              required
            />
          </div>
          <div>
            <label htmlFor="price-input">Price</label>
            <input
              id="price-input"
              type="number"
              name='displayPrice'
              value={displayPrice}
              step={0.01}
              onChange={this.handleInput}
              required
            />
          </div>
          <div>
            <label htmlFor="desc-input">Materials</label>
            <textarea
              id="desc-input"
              type="text"
              name='materials'
              value={materials}
              onChange={this.handleInput}
            />
          </div>
          <div>
            <label htmlFor="desc-input">Description</label>
            <textarea
              id="desc-input"
              type="text"
              name='description'
              value={description}
              onChange={this.handleInput}
            />
          </div>
          <button type="submit">Submit</button>
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
          </dl>
        </div>
      </div>
    )
  }
}

export default AddItem;

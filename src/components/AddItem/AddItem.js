import React, { Component } from 'react'
import { postItem, postImages, deleteImage } from '../../API'
import { validatePrice, validateQuantity, parseCategories } from './helpers'
import './addItem.css'

const defaultValues = {
  name: '',
  description: '',
  materials: '',
  displayPrice: '',
  categories: '',
  quantity: 1
}

class AddItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      materials: '',
      displayPrice: '',
      categories: '',
      quantity: 1,
      files: [],
      images: [],
      imagesDeleting: [],
      imageUploading: false
    }
    this.handleInput = this.handleInput.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.handleFiles = this.handleFiles.bind(this)
    this.deleteImage = this.deleteImage.bind(this)
  }

  dataPrice() {
    const { displayPrice } = this.state
    return !isNaN(parseFloat(displayPrice))
      ? Math.round(parseFloat(displayPrice) * 100)
      : 0
  }

  resetForm() {
    this.setState(defaultValues)
  }

  handleInput(e) {
    const field = e.target.name
    if (field === 'dataPrice') {
      this.setState({
        displayPrice: validatePrice(e.target.value)
      })
    } else if (field === 'quantity') {
      this.setState({
        quantity: validateQuantity(e.target.value)
      })
    } else {
      this.setState({
        [field]: e.target.value
      })
    }
  }

  renderCategory(category, index) {
    return (
      <div key={index} className='category-chip'>
        {category}
      </div>
    )
  }

  handleFiles(e) {
    const { files } = e.target

    this.setState({
      imageUploading: true
    })

    postImages(files)
    .then(response => response.json())
    .then(imageFilenameArray => {
      this.setState(prevState => {
        return {
          imageUploading: false,
          images: [...prevState.images, ...imageFilenameArray]
        }
      }
    )
    })
    .catch(e => console.error(e))
    e.target.files = null
  }

  deleteImage(filename) {
    return e => {
      deleteImage(filename)
      .then(response => {
        this.setState(prevState => {
          return {
            images: prevState.images.filter(image => image !== filename)
          }
        })
      })
      .catch(error => {
        console.error(error)
      })
    }
  }

  onSubmit(e) {
    e.preventDefault()
    const { name, materials, description, categories, quantity } = this.state
    const { initializeStoreInfo } = this.props
    const { resetForm } = this

    const itemToPost = {
      name: name.trim(),
      price: this.dataPrice(),
      description: description.trim(),
      materials: materials.trim(),
      categories: parseCategories(categories),
      quantity
    }
    
    postItem(itemToPost)
      .then(() => {
        initializeStoreInfo()
        resetForm()
      })
      .catch(e => console.error(e))
  }

  render() {
    const {
      name,
      description,
      materials,
      displayPrice,
      categories,
      quantity,
      imageUploading,
      images
    } = this.state

    return (
      <div id='add-item-page'>
        <h2>Add an item</h2>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor='name-input'>Name </label>
            <input
              placeholder='Item name'
              type='text'
              id='name-input'
              name='name'
              value={name}
              onChange={this.handleInput}
              required
            />
          </div>
          <div>
            <label htmlFor='quantity-input'>quantity </label>
            <input
              id='quantity-input'
              type='number'
              name='quantity'
              value={quantity}
              step={1}
              onChange={this.handleInput}
              required
            />
          </div>
          <div>
            <label htmlFor='price-input'>Price </label>
            <input
              placeholder={`Price e.g.: 17.50`}
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
          <div>
            <label htmlFor='image-input'>Images:</label>
            <input
              type='file'
              id='image-input'
              name='imageInput'
              onChange={this.handleFiles}
              accept='image/*'
              multiple
            />
          </div>
          <button type='submit' disabled={imageUploading}>Submit</button>
        </form>
        <div>
          <dl>
            <dt>Name</dt>
            <dd>{name}</dd>
            <dt>Quantity</dt>
            <dd>{quantity}</dd>
            <dt>Description</dt>
            <dd>{description}</dd>
            <dt>Price</dt>
            <dd>{displayPrice}</dd>
            <dt>Price stored in database</dt>
            <dd>{this.dataPrice()}</dd>
            <dt>Categories</dt>
            <dd>
              {parseCategories(categories).map((category, index) =>
                this.renderCategory(category, index)
              )}
            </dd>
            <dt>Images</dt>
            <dd>
              {images.map(filename => {
                return <img className='upload-thumbnail' src={`/api/images/${filename}`} onClick={this.deleteImage(filename)} key={filename} alt='User upload' />
              })}
            </dd>
          </dl>
        </div>
      </div>
    )
  }
}

export default AddItem

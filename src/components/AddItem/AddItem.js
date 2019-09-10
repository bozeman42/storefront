import React, { Component } from 'react'
import { postItem, postImages, deleteImage } from '../../API'
import { validatePrice, validateQuantity, parseCategories } from './helpers'
import './addItem.css'
import { formConfig } from './addItemFormConfig'

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
    console.log(props)
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
    console.log(field)
    if (field === 'displayPrice') {
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
        <form className='add-item-form' onSubmit={this.onSubmit}>
          {formConfig.map(inputField => {
            const { labelText, id, ...inputProps } = inputField
            return (
              <div key={id} className='input-group'>
                <label htmlFor={id}>{labelText}</label>
                <input 
                  id={id}
                  {...inputProps}
                  onChange={this.handleInput}
                  value={this.state[inputProps.name]}
                />
              </div>
            )
          })}
          <div className='input-group'>
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
          <div className='input-group'>
            <button type='submit' disabled={imageUploading}>Submit</button>
          </div>
        </form>
        <div>
          <dl>
            <dt>Name</dt>
            <dd>{name}</dd>
            <dt>Quantity</dt>
            <dd>{quantity}</dd>
            <dt>Materials</dt>
            <dd>{materials}</dd>
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

import React, { useState } from 'react'
import { postItem, postImages, deleteImage } from '../../API'
import { validatePrice, validateQuantity, parseCategories } from './helpers'
import './addItem.css'
import { formConfig } from './addItemFormConfig'

import { ItemImage } from './ItemImage'

const defaultValues = {
  name: '',
  description: '',
  materials: '',
  displayPrice: '',
  categories: '',
  quantity: 1,
  images: []
}

const AddItem = () => {
  const [ itemName, setItemName ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ materials, setMaterials ] = useState('')
  const [ displayPrice, setDisplayPrice ] = useState('')
  const [ categories , setCategories ] = useState('')
  const [ quantity, setQuantity ] = useState(1)
  const [ images, setImages ] = useState([])
  const [ imagesDeleting, setImagesDeleting ] = useState([])
  const [ imageUploading, setImageUploading ] = useState(false)

  const setters = {
    name: setItemName,
    description: setDescription,
    materials: setMaterials,
    displayPrice: value => setDisplayPrice(validatePrice(value)),
    categories: setCategories,
    quantity: value => setQuantity(validateQuantity(value)),
    images: setImages
  }

  const stateValues = {
    name: itemName,
    description,
    materials,
    displayPrice,
    categories,
    quantity
  }

  const dataPrice = () => {
    return !isNaN(parseFloat(displayPrice))
      ? Math.round(parseFloat(displayPrice) * 100)
      : 0
  }

  const resetForm = () => {
    Object.keys(defaultValues).forEach(key => {
      setters[key](defaultValues[key])
    })
  }

  const handleInput = e => {
    const field = e.target.name
    console.log(field)
    setters[field](e.target.value)
  }

  const renderCategory = (category, index) => {
    return (
      <div key={index} className='category-chip'>
        {category}
      </div>
    )
  }

  const handleFiles = e => {
    const { files } = e.target
    setImageUploading(true)

    postImages(files)
    .then(response => response.json())
    .then(imageFilenameArray => {
      setImageUploading(false)
      setImages([...images, ...imageFilenameArray])
    })
    .catch(e => {
      console.error(e)
    })
    e.target.files = null
  }

  const handleDeleteImage = filename => {
    return e => {
      setImagesDeleting([...imagesDeleting, filename])
      deleteImage(filename)
      .then(() => {
        setImagesDeleting([...imagesDeleting.filter(image => image !== filename)])
        setImages([
          ...images.filter(image => image !== filename)
        ])
      })
      .catch(error => {
        console.error(error)
      })
    }
  }

  const onSubmit = e => {
    e.preventDefault()

    const itemToPost = {
      name: itemName.trim(),
      price: dataPrice(),
      description: description.trim(),
      materials: materials.trim(),
      categories: parseCategories(categories),
      images,
      quantity
    }
    
    postItem(itemToPost)
      .then(() => {
        resetForm()
      })
      .catch(e => console.error(e))
  }

  return (
    <div id='add-item-page'>
      <h2>Add an item</h2>
      <form className='add-item-form' onSubmit={onSubmit}>
        {formConfig.map(inputField => {
          const { labelText, id, ...inputProps } = inputField
          return (
            <div key={id} className='input-group'>
              <label htmlFor={id}>{labelText}</label>
              <input 
                id={id}
                {...inputProps}
                onChange={handleInput}
                value={stateValues[inputProps.name]}
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
            onChange={handleFiles}
            accept='image/*'
            multiple
          />
        </div>
        <div className='input-group'>
          <div className="button-group">
            <button className="reset-button">Reset form</button>
            <button className="submit-button" type='submit' disabled={imageUploading}>Submit</button>
          </div>
        </div>
      </form>
      <div>
        <dl>
          <dt>Name</dt>
          <dd>{itemName}</dd>
          <dt>Quantity</dt>
          <dd>{quantity}</dd>
          <dt>Materials</dt>
          <dd>{materials}</dd>
          <dt>Description</dt>
          <dd>{description}</dd>
          <dt>Price</dt>
          <dd>{displayPrice}</dd>
          <dt>Price stored in database</dt>
          <dd>{dataPrice()}</dd>
          <dt>Categories</dt>
          <dd>
            {parseCategories(categories).map((category, index) =>
              renderCategory(category, index)
            )}
          </dd>
          <dt>Images</dt>
          <dd>
            {images.map(filename => {
              return <ItemImage
                className='upload-thumbnail'
                src={`/api/images/${filename}`}
                deleting={imagesDeleting.includes(filename)}
                onClick={handleDeleteImage(filename)}
                key={filename}
                alt='User upload' />
            })}
            {imageUploading ? <span>...</span> : null}
          </dd>
        </dl>
      </div>
    </div>
  )
}

export default AddItem

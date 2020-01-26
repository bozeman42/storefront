class ItemModel {
  constructor({
    id,
    name,
    description,
    materials,
    price,
    quantity,
    categories,
    category_ids,
    images,
    image_ids
  }) {
    this.id = id
    this.name = name
    this.description = description
    this.materials = materials
    this.price = price
    this.quantity = quantity
    this.categories = categories.map((category, index) => ({
      id: category_ids[index],
      category
    }))
    this.images = images ? images.map((image, index) => ({
      id: image_ids[index],
      image
    })) : []
  }
}

module.exports = ItemModel

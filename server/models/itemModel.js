class ItemModel {
  constructor({
    id,
    name,
    description,
    materials,
    price,
    quantity,
    categories,
    category_ids
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
  }
}

module.exports = ItemModel

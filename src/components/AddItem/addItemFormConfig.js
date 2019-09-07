export const formConfig = [
  {
    id: 'name-input',
    name: 'name',
    labelText: 'Name ',
    required: true,
    type: 'text',
    placeholder: 'item name'
  },
  {
    id: 'quantity-input',
    name: 'quantity',
    labelText: 'Quantity ',
    required: true,
    type: 'number',
    step: 1,
  },
  {
    id: 'price-input',
    name: 'displayPrice',
    labelText: 'Price ',
    required: true,
    placeholder: 'price e.g. 17.50',
    type: 'number',
    step: 0.01
  },
  {
    id: 'materials-input',
    name: 'materials',
    labelText: 'Materials ',
    type: 'text'
  },
  {
    id: 'description-input',
    name: 'description',
    labelText: 'Description ',
    type: 'text'
  },
  {
    id: 'category-input',
    name: 'categories',
    labelText: 'Categories (comma separated) ',
    type: 'text'
  }
]
import React from 'react'

const Nav = ({setCategory, categories}) => {
  return (
    <nav className="nav">
      <div onClick={() => setCategory('all')}>
        <button>
          All categories
        </button>
      </div>
      {categories.map(cat => {
        const { id, category } = cat
        return (
        <div key={id}>
          <button onClick={() => setCategory(category)}>
            {category}
          </button>
        </div>
        )
      }
      )}
    </nav>
  )
}

export default Nav

import React from 'react'

const Nav = ({setCategory, categories}) => {
  return (
    <nav className="nav">
      <div onClick={setCategory('all')}>
        <p>
          All categories
        </p>
      </div>
      {categories.map(cat => {
        const { id, category } = cat
        return (
        <div key={id} onClick={setCategory(category)}>
          <p>
            {category}
          </p>
        </div>
        )
      }
      )}
    </nav>
  )
}

export default Nav

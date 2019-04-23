import React from 'react'

const Nav = ({setCategory, categories}) => {
  return (
    <nav className="nav">
      {categories.map(category => (
        <div onClick={setCategory(category)}>
          <p>
            {category}
          </p>
        </div>
      ))}
    </nav>
  )
}

export default Nav

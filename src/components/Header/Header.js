import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({setCategory}) => (
  <header className="App-header">
    <h1>Melissa's Store!</h1>
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
          <Link to='/admin/addItem'>Add Item</Link>
        </li>
      </ul>
    </nav>
  </header>
)

export default Header

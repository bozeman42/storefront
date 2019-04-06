import React from 'react'

const Header = ({setCategory}) => (
  <header className="App-header">
    <h1>Melissa's Store!</h1>
    <div>
      <button onClick={() => setCategory('all')}>All!</button>
      <button onClick={() => setCategory('dragon')}>Drangon!</button>
      <button onClick={() => setCategory('fox')}>Fox!</button>
    </div>
  </header>
)

export default Header

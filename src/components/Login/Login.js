import React, { Component } from 'react'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      loading: false,
      error: false
    }
  }

  render() {
    return (
      <div id='login-page'>
        <p>Login page</p>
      </div>
    )
  }
}

export default Login

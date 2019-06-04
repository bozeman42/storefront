import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => 
    fakeAuth.isAuthenticated
    ? <Component {...rest} />
    : <Redirect to='/' />
  } />
)

export default ProtectedRoute

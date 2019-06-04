const fakeAuth = {
  isAuthenticated: false,
  authenticate: callback => {
    this.isAuthenticated = true
    callback()
  },
  logOut: callback => {
    this.isAuthenticated = false
    callback()
  }
}

export default fakeAuth
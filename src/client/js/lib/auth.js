class Auth {
  // eslint-disable-next-line consistent-return
  static headerToken() {
    const header = window.sessionStorage.getItem('bear-token')
    return header
  }
}

export default Auth

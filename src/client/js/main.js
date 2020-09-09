/**
 * @output main.min
 */
import 'jquery'
import 'bootstrap'
import 'popper.js'
import './lib/navbar'

const token = window.sessionStorage.getItem('bear-token')
if (token !== undefined && token !== null) {
  document.querySelector('#login').style.display = 'none'
  document.querySelector('#register').style.display = 'none'
} else {
  window.sessionStorage.clear()
}

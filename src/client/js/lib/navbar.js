const email = window.sessionStorage.getItem('email')

if (email !== null) {
  document.querySelector('#logout').innerHTML = email
}

const url = window.location.href
const items = document.querySelectorAll('.nav-item')
console.log(items)
if (url.indexOf('category') !== -1) {
  items.forEach((item) => {
    item.classList.remove('active')
  })
  items[1].classList.add('active')
} else if (url.indexOf('product') !== -1) {
  items.forEach((item) => {
    item.classList.remove('active')
  })
  items[1].classList.add('active')
} else if (url.indexOf('qty') !== -1) {
  items.forEach((item) => {
    item.classList.remove('active')
  })
  items[2].classList.add('active')
}

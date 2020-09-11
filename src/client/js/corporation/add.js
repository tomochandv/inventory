/**
 * @output corporation/add.min
 */
import $ from 'jquery'
import 'bootstrap'
import 'popper.js'
import swal from 'sweetalert'
import { loginAxios, retunData } from '../lib/axios'
import '../lib/navbar'

const coidx = document.querySelector('#coidx')
const name = document.querySelector('#txtnm')
const tell = document.querySelector('#tell')
const addr = document.querySelector('#addr')

const save = async () => {
  const data = {
    name: name.value,
    tell: tell.value,
    addr: addr.value,
    coidx: coidx.value,
  }
  const url = coidx.value === '0' ? 'corporation/add' : 'corporation/edit'
  const info = await loginAxios.post(url, data)
  const datas = await retunData(info)
  if (datas.data.result) {
    const yes = await swal('Yap~!', datas.data.message, 'success')
    if (yes) {
      window.location.href = '/corporation'
    }
  } else {
    swal('Oops.....', datas.data.message, 'error')
  }
}

const getDetail = async () => {
  const info = await loginAxios.get(`corporation/detail?coidx=${coidx.value}`)
  const datas = await retunData(info)
  if (datas.data.result) {
    if (datas.data.data.length === 1) {
      name.value = datas.data.data[0].co_nm
      tell.value = datas.data.data[0].co_tell
      addr.value = datas.data.data[0].co_addr
    }
  } else {
    swal('Oops.....', datas.data.message, 'error')
  }
}

window.addEventListener('load', () => {
  const forms = document.getElementsByClassName('needs-validation')
  Array.prototype.filter.call(forms, (form) => {
    form.addEventListener('submit', (event) => {
      if (form.checkValidity() === true) {
        save()
      }
      event.preventDefault()
      event.stopPropagation()
      form.classList.add('was-validated')
    }, false)
  })
})

const init = async () => {
  if (coidx.value !== '0') {
    getDetail()
  }
}

init()

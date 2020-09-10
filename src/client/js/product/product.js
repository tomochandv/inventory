/**
 * @output product/product.min
 */
import $ from 'jquery'
import 'bootstrap'
import 'popper.js'
import swal from 'sweetalert'
import { loginAxios, retunData } from '../lib/axios'
import '../lib/navbar'

const sel1 = document.querySelector('#sel1')
const sel2 = document.querySelector('#sel2')
const sel3 = document.querySelector('#sel3')
const name = document.querySelector('#txtnm')
const qty = document.querySelector('#qty')
const desc = document.querySelector('#desc')

const selec1Bind = async () => {
  const info = await loginAxios.get('category/1')
  const datas = await retunData(info)
  if (datas.data.result) {
    $(sel1).children('option').remove()
    datas.data.data.forEach((element) => {
      const html = `<option value="${element.caidx}">${element.ca_nm}</option>`
      $(sel1).append(html)
    })
  } else {
    swal('Oops.....', datas.data.message, 'error')
  }
}

const selec2Bind = async () => {
  const info = await loginAxios.get(`category/2?caidx=${sel1.value}`)
  const datas = await retunData(info)
  if (datas.data.result) {
    $(sel2).children('option').remove()
    datas.data.data.forEach((element) => {
      const html = `<option value="${element.subidx}">${element.sub_nm}</option>`
      $(sel2).append(html)
    })
  } else {
    swal('Oops.....', datas.data.message, 'error')
  }
}

const selec3Bind = async () => {
  const info = await loginAxios.get(`category/3?subidx=${sel2.value}`)
  const datas = await retunData(info)
  if (datas.data.result) {
    $(sel3).children('option').remove()
    datas.data.data.forEach((element) => {
      const html = `<option value="${element.botidx}">${element.bot_nm}</option>`
      $(sel3).append(html)
    })
  } else {
    swal('Oops.....', datas.data.message, 'error')
  }
}

const save = async () => {
  const data = {
    caidx: sel1.value,
    subidx: sel2.value,
    botidx: sel3.value,
    name: name.value,
    qty: 0,
    desc: desc.value,
  }
  const info = await loginAxios.post('product/add', data)
  const datas = await retunData(info)
  if (datas.data.result) {
    const yes = await swal('Yap~!', datas.data.message, 'success')
    if (yes) {
      name.value = ''
      // qty.value = ''
      desc.value = ''
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
  await selec1Bind()
  await selec2Bind()
  await selec3Bind()
}

init()

sel1.addEventListener('change', async () => {
  await selec2Bind()
  await selec3Bind()
})

sel2.addEventListener('change', async () => {
  await selec3Bind()
})

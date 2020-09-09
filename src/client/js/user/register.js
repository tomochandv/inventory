/**
 * @output user/register.min
 */
import 'jquery'
import 'bootstrap'
import 'popper.js'
import swal from 'sweetalert'
import { load } from 'recaptcha-v3'
import { normalAxios } from '../lib/axios'

const recaptchCheck = async () => {
  const recaptcha = await load('6LecR8kZAAAAAIwxyZ1FlUhv-JTWvBk-zijzyqhT')
  const token = await recaptcha.execute('login')
  const result = await normalAxios.post('recaptch', {
    recaptcha: token,
  })
  if (!result.data.result) {
    const ok = await swal('Booo~~~', '올바른 접근이 아닙니다.', 'warn')
    if (ok) {
      window.location.href = '/'
    }
  }
}

recaptchCheck()

const email = document.querySelector('#email')
const pwd = document.querySelector('#pwd')
const btnCancle = document.querySelector('#btnCancle')

const save = async () => {
  const data = {
    email: email.value,
    pwd: pwd.value,
  }
  const result = await normalAxios.post('register', data)
  if (result.data.result) {
    const yes = await swal('Yap~!', result.data.message, 'success')
    if (yes) {
      window.location.href = '/login'
    }
  } else {
    swal('Oops~', result.data.message, 'error')
    email.value = ''
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

btnCancle.addEventListener('click', () => {
  window.location.href = '/'
})

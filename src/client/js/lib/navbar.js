import Cookies from 'js-cookie'
import moment from 'moment'
import { normalAxios } from './axios'

/**
* 공지사항 있을시 표시
 */
normalAxios.get('alert').then((info) => {
  if (info.data.result) {
    const list = info.data.data
    if (list.length > 0) {
      let text = ''
      list.forEach((item) => {
        text += `&nbsp;🧙🏻‍♂️ ${item.contents} [${moment(item.regdate).format('YY.MM.DD')}]`
      })
      const isCookie = Cookies.get('alert')
      if (isCookie === undefined) {
        document.querySelector('#alertContents').innerHTML = text
        document.querySelector('#alertNotice').style.display = 'block'
      }
    }
  }
})
document.querySelector('#alertClose').addEventListener('click', async () => {
  const will = await swal({
    title: '24시간 동안 보지 않으시겠습니까?',
    text: '24시간 후에는 다시 보입니다.',
    icon: 'warning',
    buttons: ['No', 'Yes!'],
    dangerMode: true,
  })
  if (will) {
    Cookies.set('alert', 'Y', { expires: 1, path: '' })
    document.querySelector('#alertNotice').style.display = 'none'
  }
})

/** 상단 아이디 표시 */
const email = window.sessionStorage.getItem('email')

if (email !== null) {
  document.querySelector('#logout').innerHTML = email
}

/**
 * 네비게이션 포커스
 */
const url = window.location.href
const items = document.querySelectorAll('.nav-item')

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

/**
 * @output product/categoryAdd.min
 */
import $ from 'jquery'
import 'bootstrap'
import 'popper.js'
import swal from 'sweetalert'
import { loginAxios, retunData } from '../lib/axios'
import '../lib/navbar'

const button1 = document.querySelector('#save1')
const button2 = document.querySelector('#save2')
const button3 = document.querySelector('#save3')

const text1 = document.querySelector('#txtCate1')
const text2 = document.querySelector('#txtCate2')
const text3 = document.querySelector('#txtCate3')

const sel1 = document.querySelector('#sel1')
const sel2 = document.querySelector('#sel2')
const sel3 = document.querySelector('#sel3')

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

const save1 = async () => {
  if (text1.value !== '') {
    const saved = await loginAxios.post('category/add/1', { name: text1.value })
    const datas = await retunData(saved)
    if (datas.data.result) {
      $(sel1).children('option').remove()
      saved.data.data.forEach((element) => {
        const html = `<option value="${element.caidx}">${element.ca_nm}</option>`
        $(sel1).append(html)
      })
      swal('저장 성공', '셀렉트 박스를 확인해보세요.', 'success')
      text1.value = ''
    } else {
      swal('Oops.....', saved.data.message, 'error')
    }
  } else {
    swal('빈값은 안되요!', '첫번째 카테고리 명을 입력하세요.', 'warning')
  }
}

const save2 = async () => {
  if (text2.value !== '') {
    const saved = await loginAxios.post('category/add/2', { name: text2.value, caidx: sel1.value })
    const datas = await retunData(saved)
    if (datas.data.result) {
      $(sel2).children('option').remove()
      saved.data.data.forEach((element) => {
        const html = `<option value="${element.subidx}">${element.sub_nm}</option>`
        $(sel2).append(html)
      })
      swal('저장 성공', '셀렉트 박스를 확인해보세요.', 'success')
      text2.value = ''
    } else {
      swal('Oops.....', saved.data.message, 'error')
    }
  } else {
    swal('빈값은 안되요!', '두번째 카테고리 명을 입력하세요.', 'warning')
  }
}

const save3 = async () => {
  if (text3.value !== '') {
    const saved = await loginAxios.post('category/add/3', { name: text3.value, subidx: sel2.value })
    const datas = await retunData(saved)
    if (datas.data.result) {
      $(sel3).children('option').remove()
      saved.data.data.forEach((element) => {
        const html = `<option value="${element.botidx}">${element.bot_nm}</option>`
        $(sel3).append(html)
      })
      swal('저장 성공', '셀렉트 박스를 확인해보세요.', 'success')
      text3.value = ''
    } else {
      swal('Oops.....', saved.data.message, 'error')
    }
  } else {
    swal('빈값은 안되요!', '세번째 카테고리 명을 입력하세요.', 'warning')
  }
}

const init = async () => {
  await selec1Bind()
  await selec2Bind()
  await selec3Bind()
}

init()

button1.addEventListener('click', save1)
button2.addEventListener('click', save2)
button3.addEventListener('click', save3)

sel1.addEventListener('change', async () => {
  await selec2Bind()
  await selec3Bind()
})

sel2.addEventListener('change', () => {
  selec3Bind()
})

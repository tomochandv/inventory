/**
 * @output product/productList.min
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
const name = document.querySelector('#name')

const selec1Bind = async () => {
  const info = await loginAxios.get('category/1')
  const datas = await retunData(info)
  if (datas.data.result) {
    $(sel1).children('option').remove()
    $(sel1).append('<option value="">모두</>')
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
    $(sel2).append('<option value="">모두</>')
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
    $(sel3).append('<option value="">모두</>')
    datas.data.data.forEach((element) => {
      const html = `<option value="${element.botidx}">${element.bot_nm}</option>`
      $(sel3).append(html)
    })
  } else {
    swal('Oops.....', datas.data.message, 'error')
  }
}

const deleteProduct = async (e) => {
  const will = await swal({
    title: '진짜 삭제 하실거에요?',
    text: '삭제 하시면 복구가 불가능 합니다.',
    icon: 'warning',
    buttons: ['취소', '진짜 삭제!'],
    dangerMode: true,
  })
  if (will) {
    const idx = e.target.value
    const info = await loginAxios.post('product/remove', { pridx: idx })
    const datas = await retunData(info)
    if (datas.data.result) {
      swal('성공', datas.data.message, 'success')
      // eslint-disable-next-line no-use-before-define
      await tableBind()
    } else {
      swal('Oops.....', datas.data.message, 'error')
    }
  }
}

const deleteBind = () => {
  document.querySelectorAll('[name=delete]').forEach((node) => {
    node.addEventListener('click', deleteProduct)
  })
}

const tableBind = async () => {
  const url = `product/list?caidx=${sel1.value}&botidx=${sel3.value}&subidx=${sel2.value}&prnm=${name.value}`
  const info = await loginAxios.get(url)
  const datas = await retunData(info)
  if (datas.data.result) {
    document.querySelector('#qty').innerHTML = datas.data.data.length
    let html = ''
    if (datas.data.data.length > 0) {
      datas.data.data.forEach((item) => {
        html += `<tr>
          <td scope="row" class="text-center"><u><a href="/product/add?pridx=${item.pridx}">${item.pridx}</a></u></td>
          <td class="text-center">${item.ca_nm}</td>
          <td class="text-center">${item.sub_nm}</td>
          <td class="text-center">${item.bot_nm}</td>
          <td class="text-center">${item.pr_nm}</td>
          <td class="text-center">
            <button name="delete" type="button" class="btn btn-outline-danger" value="${item.pridx}">삭제</button>
          </td>
        </tr>`
      })
    } else {
      html = '<tr><td class="text-center" colspan="6">No Data.</td></tr>'
    }
    $('tbody > tr').remove()
    $('tbody').append(html)
    deleteBind()
  }
}

const init = async () => {
  await selec1Bind()
  await selec2Bind()
  await selec3Bind()
  await tableBind()
}

init()

sel1.addEventListener('change', async () => {
  await selec2Bind()
  await selec3Bind()
})

sel2.addEventListener('change', async () => {
  await selec3Bind()
})

document.querySelector('#search').addEventListener('click', tableBind)

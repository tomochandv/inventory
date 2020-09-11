/**
 * @output corporation/list.min
 */
import $ from 'jquery'
import 'bootstrap'
import 'popper.js'
import swal from 'sweetalert'
import { loginAxios, retunData } from '../lib/axios'
import '../lib/navbar'
import Pager from '../lib/pager'

const perPage = 20
const name = document.querySelector('#name')
const pagerElement = document.querySelector('#pagenation')

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
    const info = await loginAxios.post('corporation/remove', { coidx: idx })
    const datas = await retunData(info)
    if (datas.data.result) {
      swal('성공', datas.data.message, 'success')
      // eslint-disable-next-line no-use-before-define
      await tableBind(1)
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

const pageClick = async (page) => {
  // eslint-disable-next-line no-use-before-define
  tableBind(page)
}

const createPager = async (curpage, total) => {
  const pager = new Pager(pagerElement, total, perPage, pageClick)
  pager.bind(curpage)
}

const tableBind = async (page) => {
  const info = await loginAxios.get('corporation/list', {
    params: {
      page,
      perPage,
      name: name.value,
    },
  })
  const datas = await retunData(info)
  if (datas.data.result) {
    document.querySelector('#qty').innerHTML = datas.data.data.total
    createPager(page, datas.data.data.total)
    let html = ''
    if (datas.data.data.list.length > 0) {
      datas.data.data.list.forEach((item) => {
        html += `<tr>
          <td scope="row" class="text-center"><u><a href="/corporation/add?coidx=${item.coidx}">${item.coidx}</a></u></td>
          <td class="text-center">${item.co_nm}</td>
          <td class="text-center">${item.co_tell}</td>
          <td class="text-center">
            <button name="delete" type="button" class="btn btn-outline-danger" value="${item.coidx}">삭제</button>
          </td>
        </tr>`
      })
    } else {
      html = '<tr><td class="text-center" colspan="4">No Data.</td></tr>'
    }
    $('tbody > tr').remove()
    $('tbody').append(html)
    deleteBind()
  }
}

const init = async () => {
  await tableBind(1)
}

init()

document.querySelector('#search').addEventListener('click', () => {
  tableBind(1)
})

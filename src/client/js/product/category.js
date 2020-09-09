/**
 * @output product/category.min
 */
import 'jquery'
import 'bootstrap'
import 'popper.js'
import swal from 'sweetalert'
import { loginAxios, retunData } from '../lib/axios'
import '../lib/navbar'

const sel1 = document.querySelector('#sel1')
const sel2 = document.querySelector('#sel2')
const sel3 = document.querySelector('#sel3')

const selec1Bind = async () => {
  const info = await loginAxios.get('category/1')
  const datas = await retunData(info)
  if (datas.data.result) {
    $(sel1).children('option').remove()
    $(sel1).append('<option value="">모두</option>')
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
    $(sel2).append('<option value="">모두</option>')
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
    $(sel3).append('<option value="">모두</option>')
    datas.data.data.forEach((element) => {
      const html = `<option value="${element.botidx}">${element.bot_nm}</option>`
      $(sel3).append(html)
    })
  } else {
    swal('Oops.....', datas.data.message, 'error')
  }
}

const listBind = async () => {
  const list = await loginAxios.get(`category/list?caidx=${sel1.value}&subidx=${sel2.value}&botidx=${sel3.value}`)
  const datas = await retunData(list)
  if (datas.data.result) {
    const tbody = $('table > tbody')
    tbody.children('tr').remove()
    const items = datas.data.data
    document.querySelector('#qty').innerHTML = items.length
    let html = ''
    if (items.length > 0) {
      items.forEach((item) => {
        html += `<tr>
          <td class="text-center">${item.ca_nm}</td>
          <td class="text-center">${item.sub_nm === null ? '' : item.sub_nm}</td>
          <td class="text-center">${item.bot_nm === null ? '' : item.bot_nm}</td>
          <td class="text-center">
            <button name="delete" type="button" class="btn btn-outline-danger" value="${item.caidx},${item.subidx === null ? '0' : item.subidx},${item.botidx === null ? '0' : item.botidx}">삭제</button>
          </td>
        </tr>`
      })
    } else {
      html += '<tr><td class="text-center">No Data.</td></tr>'
    }
    tbody.append(html)
  } else {
    swal('Oops.....', datas.data.message, 'error')
  }
}

const deleteCategory = async (e) => {
  const idx = e.target.value
  const info = await loginAxios.post('category/remove', { idx })
  const datas = await retunData(info)
  if (datas.data.result) {
    swal('성공', datas.data.message, 'success')
    await listBind()
    deleteBind()
  } else {
    swal('Oops.....', datas.data.message, 'error')
  }
}

const deleteBind = () => {
  document.querySelectorAll('[name=delete]').forEach((node) => {
    node.addEventListener('click', deleteCategory)
  })
}

const init = async () => {
  await selec1Bind()
  await selec2Bind()
  await selec3Bind()
  await listBind()
  deleteBind()
}

init()

sel1.addEventListener('change', async () => {
  await selec2Bind()
  await selec3Bind()
  await listBind()
  deleteBind()
})

sel2.addEventListener('change', async () => {
  await selec3Bind()
  await listBind()
  deleteBind()
})

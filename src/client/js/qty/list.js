/**
 * @output qty/list.min
 */
import $ from 'jquery'
import 'bootstrap'
import 'popper.js'
import swal from 'sweetalert'
import numeral from 'numeral'
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

const updateQty = async (e) => {
  const target = e.target
  const pridx = target.value
  const qtyElement = target.parentElement.parentElement.children[6].children[0]
  const priceelement = target.parentElement.parentElement.children[7].children[0]
  const info = await loginAxios.post('qty/add', {
    pridx,
    qty: qtyElement.value,
    price: priceelement.value,
  })
  const datas = await retunData(info)
  if (datas.data.result) {
    swal('성공', datas.data.message, 'success')
    // eslint-disable-next-line no-use-before-define
    await tableBind()
  } else {
    swal('Oops.....', datas.data.message, 'error')
  }
}

const updateBind = () => {
  document.querySelectorAll('[name=update]').forEach((node) => {
    node.addEventListener('click', updateQty)
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
          <td scope="row" class="text-center">${item.pridx}</td>
          <td class="text-center">${item.co_nm}</td>
          <td class="text-center">${item.ca_nm} > ${item.sub_nm} > ${item.bot_nm}</td>
          <td class="text-center">${item.pr_nm}</td>
          <td class="text-center">${item.pr_desc}</td>
          <td class="text-center">${numeral(item.qty).format('0,0')}</td>
          <td class="text-center"><input class="form-control form-control-sm" type="number" name="txtQty"></td>
          <td class="text-center"><input class="form-control form-control-sm" type="number" name="txtPrice"></td>
          <td class="text-center">
            <button name="update" type="button" class="btn btn-outline-info" value="${item.pridx}">저장</button>
          </td>
        </tr>`
      })
    } else {
      html = '<tr><td class="text-center" colspan="8">No Data.</td></tr>'
    }
    $('tbody > tr').remove()
    $('tbody').append(html)
    updateBind()
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

/**
 * @output static/product/list.min
 */
import $ from 'jquery'
import 'bootstrap'
import 'popper.js'
import flatpickr from 'flatpickr'
import { Korean } from 'flatpickr/dist/l10n/ko'
import 'flatpickr/dist/themes/confetti.css'
import moment from 'moment'
import numeral from 'numeral'
import swal from 'sweetalert'
import { loginAxios, retunData } from '../../lib/axios'
import '../../lib/navbar'
import Pager from '../../lib/pager'

const perPage = 20
const sel1 = document.querySelector('#sel1')
const sel2 = document.querySelector('#sel2')
const sel3 = document.querySelector('#sel3')
const name = document.querySelector('#name')
const type = document.querySelector('#selType')
const sdate = document.querySelector('#sdate')
const pagerElement = document.querySelector('#pagenation')

const duration = flatpickr(sdate, {
  locale: Korean,
  dateFormat: 'Y-m-d',
  mode: 'range',
})

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

const pageClick = async (page) => {
  // eslint-disable-next-line no-use-before-define
  tableBind(page)
}

const createPager = async (curpage, total) => {
  const pager = new Pager(pagerElement, total, perPage, pageClick)
  pager.bind(curpage)
}

const tableBind = async (page) => {
  const info = await loginAxios.get('static/product/list', {
    params: {
      page,
      perPage,
      caidx: sel1.value,
      subidx: sel2.value,
      botidx: sel3.value,
      prnm: name.value,
      type: type.value,
      sdate: duration.selectedDates.length === 0 ? '' : moment(duration.selectedDates[0]).format('YYYY-MM-DD'),
      edate: duration.selectedDates.length === 0 ? '' : moment(duration.selectedDates[1]).format('YYYY-MM-DD'),
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
          <td scope="row" class="text-center">${item.pridx}</td>
          <td class="text-center">${item.ca_nm} > ${item.sub_nm} > ${item.bot_nm}</td>
          <td class="text-center">${item.pr_nm}</td>
          <td class="text-center">${item.pr_desc}</td>
          <td class="text-center">${numeral(item.qty).format('0,0')}</td>
          <td class="text-center">${numeral(item.price).format('0,0')}</td>
        </tr>`
      })
    } else {
      html = '<tr><td class="text-center" colspan="7">No Data.</td></tr>'
    }
    $('tbody > tr').remove()
    $('tbody').append(html)
  }
}

const init = async () => {
  await selec1Bind()
  await selec2Bind()
  await selec3Bind()
  await tableBind(1)
}
init()
sel1.addEventListener('change', async () => {
  await selec2Bind()
  await selec3Bind()
})
sel2.addEventListener('change', async () => {
  await selec3Bind()
})
document.querySelector('#search').addEventListener('click', () => {
  tableBind(1)
})
document.querySelector('#chart').addEventListener('click', () => {
  let url = '/static/product/chart?'
  url += `caidx=${sel1.value}`
  url += `&subidx=${sel2.value}`
  url += `&botidx=${sel3.value}`
  url += `&prnm=${name.value}`
  url += `&type=${type.value}`
  url += `&sdate=${duration.selectedDates.length === 0 ? '' : moment(duration.selectedDates[0]).format('YYYY-MM-DD')}`
  url += `&edate=${duration.selectedDates.length === 0 ? '' : moment(duration.selectedDates[1]).format('YYYY-MM-DD')}`
  window.open(url, 'chart')
})

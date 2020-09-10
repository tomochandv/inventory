/**
 * 페이저
 * @class Pager
 */
class Pager {
  /**
   *Creates an instance of Pager.
   * @param {*} element 바인딩항 div
   * @param {*} total 총 데이터 수
   * @param {*} rows 보여질 rows 수
   * @param {*} fn 클릭시 이벤트
   * @memberof Pager
   */
  constructor(element, total, rows, fn) {
    this.element = element
    this.totalcount = total
    this.rows = rows
    this.pageCount = 10
    this.fn = fn
  }

  clickEvent(fn) {
    this.fn = fn
  }

  /**
   * 페이저 생성
   * @memberof Pager
   */
  bind(curPage) {
    curPage = Number(curPage)
    const totalPage = Math.ceil(this.totalcount / this.rows)
    const pageGroup = Math.ceil(curPage / this.pageCount)

    let last = pageGroup * this.pageCount
    if (last > totalPage) {
      last = totalPage
    }
    const first = last - (this.pageCount - 1) < 0 ? 1 : last - (this.pageCount - 1)
    const next = last + 1
    const prev = first - 1
    let html = ''
    html += ''
    if (prev > 0) {
      html += `
      <li class="page-item" name="pagerButton" id="prev" data="${prev}">
        <button class="page-link" id="prev" data="${prev}"><</button>
      </li>
      `
    }
    for (let i = first; i <= last; i += 1) {
      // console.log(curPage, i)
      html += `<li class="page-item ${curPage === i ? 'active' : ''}">
        <button class="page-link" name="pagerButton" id="pager${i}" data="${i}">${i}</button>
      </li>`
    }

    if (last < totalPage) {
      html += `
      <li class="page-item" name="pagerButton" id="next" data="${next}">
      <button class="page-link" id="prev" data="${next}">></button>
      </li>`
      // html += `<button class="page" name="pagerButton" id="first" data="${next}">끝으로</button>`
    } else {
      // html += `<button class="page" name="pagerButton" id="first" data="${last}">끝으로</button>`
    }
    this.element.innerHTML = html
    document.getElementsByName('pagerButton').forEach((node) => {
      const page = node.getAttribute('data')
      const newEvent = this.fn
      node.addEventListener('click', () => {
        newEvent(page)
      }, false)
    })
  }
}

export default Pager

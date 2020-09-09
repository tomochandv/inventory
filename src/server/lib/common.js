import ip6addr from 'ip6addr'
import requestIp from 'request-ip'

class Common {
  /**
   * body 안으로 들어온 파라미터 받기
   * @param {Object} ctx ctx object
   * @param {Array} name 파라미터 명
   * @returns {boolean} 파라미터 값, 파라미터 없을시 ''
   * @memberof Common
   */
  requestPost(ctx, name) {
    this.ctx = ctx
    this.name = name
    let txt = ''
    try {
      if (this.ctx.request.body[this.name] !== undefined) {
        txt = this.ctx.request.body[this.name].toString().replace(/'/gi, '&#39;')
      }
    } catch (err) {
      txt = ''
    }
    return txt
  }

  /**
   * post 으로 들어온 parameter int 일때
   * @param {Object} ctx koa ctx object
   * @param {Object} name 파라미터명
   * @memberof Common
   */
  requestPostInt(ctx, name) {
    this.ctx = ctx
    this.name = name
    let txt = 0
    try {
      if (this.ctx.request.body[this.name] !== undefined && Number.isNaN(this.ctx.request.body[this.name]) === false) {
        txt = Number(this.ctx.request.body[this.name])
      }
    } catch (err) {
      txt = 0
    }
    return txt
  }

  /**
   * get 으로 들어온 parameter
   * @param {Object} ctx koa ctx object
   * @param {Object} name 파라미터명
   * @memberof Common
   */
  requestGet(ctx, name) {
    this.ctx = ctx
    this.name = name
    let txt = ''
    try {
      if (this.ctx.request.query[this.name] !== undefined) {
        txt = this.ctx.request.query[this.name].replace(/'/gi, '&#39;')
      }
    } catch (err) {
      txt = ''
    }
    return txt
  }

  /**
   * get 으로 들어온 숫자 parameter
   * @param {Object} ctx koa ctx object
   * @param {Object} name 파라미터명
   * @memberof Common
   */
  requestGetInt(ctx, name) {
    this.ctx = ctx
    this.name = name
    try {
      if (this.ctx.request.query[this.name] !== undefined && Number.isNaN(this.ctx.request.query[this.name]) === false) {
        this.txt = Number(ctx.request.query[this.name])
      }
    } catch (err) {
      this.txt = 0
    }
    return this.txt
  }

  /**
   * 아이피 구하기
   * @param {Object} ctx koa ctx object
   * @returns 아이피
   * @memberof Common
   */
  getIp(ctx) {
    this.ctx = ctx
    let ip = ''
    try {
      const reqIp = requestIp.getClientIp(this.ctx.request) === '::1' ? '127.0.0.1' : requestIp.getClientIp(this.ctx.request)
      const ipv6 = ip6addr.parse(reqIp)
      const v4 = ipv6.toString({ format: 'v4' })
      ip = v4
    } catch (err) {
      ip = ''
    }
    return ip
  }
}

export default Common

import Auth from '../lib/auth'
import db from '../db/productDb'
import Payload from '../model/payload'
import Common from '../lib/common'

const common = new Common()

const controll = {
  addFirstCategory: async (ctx) => {
    const payload = new Payload()
    try {
      const userInfo = await Auth.userInfo(ctx)
      if (userInfo === null) {
        payload.data = 'F'
        payload.result = false
        payload.message = '로그인이 되지 않은 상태입니다.'
      } else {
        const useridx = userInfo.useridx
        const name = common.requestPost(ctx, 'name')
        const check = await db.getFirstCategoryName(useridx, name)
        if (check.length === 0) {
          await db.addFirstCategory(useridx, name)
          const list = await db.getFirstCategory(useridx)
          payload.data = list
          payload.result = true
        } else {
          payload.result = false
          payload.message = '중복된 명칭입니다.'
        }
      }
    } catch (err) {
      console.log(err)
      payload.message = '서버 에러입니다.'
      payload.result = false
    }
    ctx.body = payload.model()
  },
  getFirstCategory: async (ctx) => {
    const payload = new Payload()
    try {
      const userInfo = await Auth.userInfo(ctx)
      if (userInfo === null) {
        payload.data = 'F'
        payload.result = false
        payload.message = '로그인이 되지 않은 상태입니다.'
      } else {
        const useridx = userInfo.useridx
        const list = await db.getFirstCategory(useridx)
        payload.data = list
        payload.result = true
      }
    } catch (err) {
      console.log(err)
      payload.message = '서버 에러입니다.'
      payload.result = false
    }
    ctx.body = payload.model()
  },
  addSecondCategory: async (ctx) => {
    const payload = new Payload()
    try {
      const userInfo = await Auth.userInfo(ctx)
      if (userInfo === null) {
        payload.data = 'F'
        payload.result = false
        payload.message = '로그인이 되지 않은 상태입니다.'
      } else {
        const caidx = common.requestPost(ctx, 'caidx')
        const name = common.requestPost(ctx, 'name')
        const check = await db.getSecondCategoryName(caidx, name)
        if (check.length === 0) {
          await db.addSecondCategory(caidx, name)
          const list = await db.getSecondCategory(caidx)
          payload.data = list
          payload.result = true
        } else {
          payload.result = false
          payload.message = '중복된 명칭입니다.'
        }
      }
    } catch (err) {
      console.log(err)
      payload.message = '서버 에러입니다.'
      payload.result = false
    }
    ctx.body = payload.model()
  },
  getSecondCategory: async (ctx) => {
    const payload = new Payload()
    try {
      const userInfo = await Auth.userInfo(ctx)
      if (userInfo === null) {
        payload.data = 'F'
        payload.result = false
        payload.message = '로그인이 되지 않은 상태입니다.'
      } else {
        const caidx = common.requestGetInt(ctx, 'caidx')
        const list = await db.getSecondCategory(caidx)
        payload.data = list
        payload.result = true
      }
    } catch (err) {
      console.log(err)
      payload.message = '서버 에러입니다.'
      payload.result = false
    }
    ctx.body = payload.model()
  },
  addThirdCategory: async (ctx) => {
    const payload = new Payload()
    try {
      const userInfo = await Auth.userInfo(ctx)
      if (userInfo === null) {
        payload.data = 'F'
        payload.result = false
        payload.message = '로그인이 되지 않은 상태입니다.'
      } else {
        const subidx = common.requestPost(ctx, 'subidx')
        const name = common.requestPost(ctx, 'name')

        const check = await db.getThirdCategoryName(subidx, name)
        if (check.length === 0) {
          await db.addThirdCategory(subidx, name)
          const list = await db.getThirdCategory(subidx)
          payload.data = list
          payload.result = true
        } else {
          payload.result = false
          payload.message = '중복된 명칭입니다.'
        }
      }
    } catch (err) {
      console.log(err)
      payload.message = '서버 에러입니다.'
      payload.result = false
    }
    ctx.body = payload.model()
  },
  getThirdCategory: async (ctx) => {
    const payload = new Payload()
    try {
      const userInfo = await Auth.userInfo(ctx)
      if (userInfo === null) {
        payload.data = 'F'
        payload.result = false
        payload.message = '로그인이 되지 않은 상태입니다.'
      } else {
        const subidx = common.requestGetInt(ctx, 'subidx')
        const list = await db.getThirdCategory(subidx)
        payload.data = list
        payload.result = true
      }
    } catch (err) {
      console.log(err)
      payload.message = '서버 에러입니다.'
      payload.result = false
    }
    ctx.body = payload.model()
  },
  getCategoryList: async (ctx) => {
    const payload = new Payload()
    try {
      const userInfo = await Auth.userInfo(ctx)
      if (userInfo === null) {
        payload.data = 'F'
        payload.result = false
        payload.message = '로그인이 되지 않은 상태입니다.'
      } else {
        const caidx = common.requestGetInt(ctx, 'caidx')
        const subidx = common.requestGetInt(ctx, 'subidx')
        const botidx = common.requestGetInt(ctx, 'botidx')
        const list = await db.getCategoryList(userInfo.useridx, caidx, subidx, botidx)
        payload.data = list
        payload.result = true
      }
    } catch (err) {
      console.log(err)
      payload.message = '서버 에러입니다.'
      payload.result = false
    }
    ctx.body = payload.model()
  },
  removeCategory: async (ctx) => {
    const payload = new Payload()
    try {
      const userInfo = await Auth.userInfo(ctx)
      if (userInfo === null) {
        payload.data = 'F'
        payload.result = false
        payload.message = '로그인이 되지 않은 상태입니다.'
      } else {
        const idx = common.requestPost(ctx, 'idx')
        const arrIdx = idx.split(',')
        if (arrIdx[2] !== '0') {
          const checkProduct = await db.getProductCount(userInfo.useridx, arrIdx[2])
          if (checkProduct[0].total === 0) {
            console.log(1)
            await db.removeCategoryDepth2(arrIdx[2])
            payload.result = true
            payload.message = '삭제되었습니다.'
          } else {
            payload.result = false
            payload.message = '사용중인 제품이 존재 합니다.'
          }
        } else if (arrIdx[2] === '0' && arrIdx[1] !== '0') {
          console.log(1)
          await db.removeCategoryDepth1(arrIdx[1])
          payload.result = true
          payload.message = '삭제되었습니다.'
        } else if (arrIdx[0] !== '0' && arrIdx[2] === '0') {
          await db.removeCategoryInfo(arrIdx[0])
          payload.result = true
          payload.message = '삭제되었습니다.'
        }
        payload.result = true
      }
    } catch (err) {
      console.log(err)
      payload.message = '서버 에러입니다.'
      payload.result = false
    }
    ctx.body = payload.model()
  },
  addProducts: async (ctx) => {
    const payload = new Payload()
    try {
      const userInfo = await Auth.userInfo(ctx)
      if (userInfo === null) {
        payload.data = 'F'
        payload.result = false
        payload.message = '로그인이 되지 않은 상태입니다.'
      } else {
        const name = common.requestPost(ctx, 'name')
        const qty = common.requestPostInt(ctx, 'qty')
        const desc = common.requestPost(ctx, 'desc')
        const caidx = common.requestPostInt(ctx, 'caidx')
        const botidx = common.requestPostInt(ctx, 'botidx')
        const subidx = common.requestPostInt(ctx, 'subidx')
        const coidx = common.requestPostInt(ctx, 'coidx')

        const checkInfo = await db.getProductName(userInfo.useridx, caidx, subidx, botidx, name)
        if (checkInfo.length > 0) {
          payload.result = false
          payload.message = '동일한 제품이 존재 합니다.'
        } else {
          const info = await db.addProduct(userInfo.useridx, caidx, subidx, botidx, name, desc, qty, 'Y')
          const pridx = info.insertId
          // await db.addProductHistory(pridx, qty)
          if (coidx !== 0) {
            await db.addCoPr(pridx, coidx)
          }
          payload.result = true
          payload.message = '저장 되었습니다.'
        }
      }
    } catch (err) {
      console.log(err)
      payload.message = '서버 에러입니다.'
      payload.result = false
    }
    ctx.body = payload.model()
  },
  getProductList: async (ctx) => {
    const payload = new Payload()
    try {
      const userInfo = await Auth.userInfo(ctx)
      if (userInfo === null) {
        payload.data = 'F'
        payload.result = false
        payload.message = '로그인이 되지 않은 상태입니다.'
      } else {
        const caidx = common.requestGetInt(ctx, 'caidx')
        const subidx = common.requestGetInt(ctx, 'subidx')
        const botidx = common.requestGetInt(ctx, 'botidx')
        const prnm = common.requestGet(ctx, 'prnm')
        const list = await db.getProductList(userInfo.useridx, caidx, subidx, botidx, prnm)
        payload.data = list
        payload.result = true
      }
    } catch (err) {
      console.log(err)
      payload.message = '서버 에러입니다.'
      payload.result = false
    }
    ctx.body = payload.model()
  },
  removeProduct: async (ctx) => {
    const payload = new Payload()
    try {
      const userInfo = await Auth.userInfo(ctx)
      if (userInfo === null) {
        payload.data = 'F'
        payload.result = false
        payload.message = '로그인이 되지 않은 상태입니다.'
      } else {
        const pridx = common.requestPostInt(ctx, 'pridx')
        await db.removeProduct(pridx)
        payload.result = true
        payload.message = '삭제되었습니다.'
      }
    } catch (err) {
      console.log(err)
      payload.message = '서버 에러입니다.'
      payload.result = false
    }
    ctx.body = payload.model()
  },
  productAdd: async (ctx) => {
    const payload = new Payload()
    try {
      const userInfo = await Auth.userInfo(ctx)
      if (userInfo === null) {
        payload.data = 'F'
        payload.result = false
        payload.message = '로그인이 되지 않은 상태입니다.'
      } else {
        const pridx = common.requestPostInt(ctx, 'pridx')
        const qty = common.requestPostInt(ctx, 'qty')
        const price = common.requestPostInt(ctx, 'price')
        await db.addProductHistory(pridx, qty, price)
        await db.setProductQty(pridx, qty)
        payload.result = true
        payload.message = '저장 되었습니다.'
      }
    } catch (err) {
      console.log(err)
      payload.message = '서버 에러입니다.'
      payload.result = false
    }
    ctx.body = payload.model()
  },
  getProductDetail: async (ctx) => {
    const payload = new Payload()
    try {
      const userInfo = await Auth.userInfo(ctx)
      if (userInfo === null) {
        payload.data = 'F'
        payload.result = false
        payload.message = '로그인이 되지 않은 상태입니다.'
      } else {
        const pridx = common.requestGetInt(ctx, 'pridx')
        const list = await db.getProductDetail(userInfo.useridx, pridx)
        payload.data = list
        payload.result = true
      }
    } catch (err) {
      console.log(err)
      payload.message = '서버 에러입니다.'
      payload.result = false
    }
    ctx.body = payload.model()
  },
  editProduct: async (ctx) => {
    const payload = new Payload()
    try {
      const userInfo = await Auth.userInfo(ctx)
      if (userInfo === null) {
        payload.data = 'F'
        payload.result = false
        payload.message = '로그인이 되지 않은 상태입니다.'
      } else {
        const pridx = common.requestPostInt(ctx, 'pridx')
        const caidx = common.requestPostInt(ctx, 'caidx')
        const subidx = common.requestPostInt(ctx, 'subidx')
        const botidx = common.requestPostInt(ctx, 'botidx')
        const prnm = common.requestPost(ctx, 'name')
        const desc = common.requestPost(ctx, 'desc')
        const coidx = common.requestPostInt(ctx, 'coidx')
        await db.setProduct(userInfo.useridx, pridx, caidx, subidx, botidx, prnm, desc)
        await db.removeCoPr(pridx)
        if (coidx !== 0) {
          await db.addCoPr(pridx, coidx)
        }
        payload.result = true
        payload.message = '수정 되었습니다.'
      }
    } catch (err) {
      console.log(err)
      payload.message = '서버 에러입니다.'
      payload.result = false
    }
    ctx.body = payload.model()
  },
  getProductHistoryList: async (ctx) => {
    const payload = new Payload()
    try {
      const userInfo = await Auth.userInfo(ctx)
      if (userInfo === null) {
        payload.data = 'F'
        payload.result = false
        payload.message = '로그인이 되지 않은 상태입니다.'
      } else {
        const caidx = common.requestGetInt(ctx, 'caidx')
        const subidx = common.requestGetInt(ctx, 'subidx')
        const botidx = common.requestGetInt(ctx, 'botidx')
        const coidx = common.requestGetInt(ctx, 'coidx')
        const prnm = common.requestGet(ctx, 'prnm')
        const sdate = common.requestGet(ctx, 'sdate')
        const edate = common.requestGet(ctx, 'edate')
        const type = common.requestGet(ctx, 'type')
        const page = common.requestGetInt(ctx, 'page')
        const perPage = common.requestGetInt(ctx, 'perPage')
        const start = (page - 1) * perPage

        const list = await db.getProductHistoryList(start, perPage, userInfo.useridx, type, caidx, subidx, botidx, coidx, prnm, sdate, edate)
        const total = await db.getProductHistoryListCount(userInfo.useridx, type, caidx, subidx, botidx, coidx, prnm, sdate, edate)
        payload.data = {
          list,
          total: total[0].total,
        }
        payload.result = true
      }
    } catch (err) {
      console.log(err)
      payload.message = '서버 에러입니다.'
      payload.result = false
    }
    ctx.body = payload.model()
  },
  getStaticList: async (ctx) => {
    const payload = new Payload()
    try {
      const userInfo = await Auth.userInfo(ctx)
      if (userInfo === null) {
        payload.data = 'F'
        payload.result = false
        payload.message = '로그인이 되지 않은 상태입니다.'
      } else {
        const caidx = common.requestGetInt(ctx, 'caidx')
        const subidx = common.requestGetInt(ctx, 'subidx')
        const botidx = common.requestGetInt(ctx, 'botidx')
        const prnm = common.requestGet(ctx, 'prnm')
        const sdate = common.requestGet(ctx, 'sdate')
        const edate = common.requestGet(ctx, 'edate')
        const type = common.requestGet(ctx, 'type')
        const page = common.requestGetInt(ctx, 'page')
        const perPage = common.requestGetInt(ctx, 'perPage')
        const start = (page - 1) * perPage

        const list = await db.getProductStaticList(start, perPage, userInfo.useridx, type, caidx, subidx, botidx, prnm, sdate, edate)
        const total = await db.getProductStaticListCount(userInfo.useridx, type, caidx, subidx, botidx, prnm, sdate, edate)
        payload.data = {
          list,
          total: total.length === 0 ? 0 : total[0].total,
        }
        payload.result = true
      }
    } catch (err) {
      console.log(err)
      payload.message = '서버 에러입니다.'
      payload.result = false
    }
    ctx.body = payload.model()
  },
  getCoporList: async (ctx) => {
    const payload = new Payload()
    try {
      const userInfo = await Auth.userInfo(ctx)
      if (userInfo === null) {
        payload.data = 'F'
        payload.result = false
        payload.message = '로그인이 되지 않은 상태입니다.'
      } else {
        const name = common.requestGet(ctx, 'name')
        const page = common.requestGetInt(ctx, 'page')
        const perPage = common.requestGetInt(ctx, 'perPage')
        const start = (page - 1) * perPage

        const list = await db.getCoporationList(start, perPage, userInfo.useridx, name)
        const total = await db.getCoporationCount(userInfo.useridx, name)
        payload.data = {
          list,
          total: total[0].total,
        }
        payload.result = true
      }
    } catch (err) {
      console.log(err)
      payload.message = '서버 에러입니다.'
      payload.result = false
    }
    ctx.body = payload.model()
  },
  getCoporDetail: async (ctx) => {
    const payload = new Payload()
    try {
      const userInfo = await Auth.userInfo(ctx)
      if (userInfo === null) {
        payload.data = 'F'
        payload.result = false
        payload.message = '로그인이 되지 않은 상태입니다.'
      } else {
        const coidx = common.requestGetInt(ctx, 'coidx')
        const list = await db.getCoporationDetail(coidx, userInfo.useridx)
        payload.data = list
        payload.result = true
      }
    } catch (err) {
      console.log(err)
      payload.message = '서버 에러입니다.'
      payload.result = false
    }
    ctx.body = payload.model()
  },
  addCopor: async (ctx) => {
    const payload = new Payload()
    try {
      const userInfo = await Auth.userInfo(ctx)
      if (userInfo === null) {
        payload.data = 'F'
        payload.result = false
        payload.message = '로그인이 되지 않은 상태입니다.'
      } else {
        const name = common.requestPost(ctx, 'name')
        const tell = common.requestPost(ctx, 'tell')
        const addr = common.requestPost(ctx, 'addr')
        const zip = common.requestPost(ctx, 'zip')
        await db.addCoporation(userInfo.useridx, name, tell, addr, zip)
        payload.result = true
        payload.message = '저장 되었습니다.'
      }
    } catch (err) {
      console.log(err)
      payload.message = '서버 에러입니다.'
      payload.result = false
    }
    ctx.body = payload.model()
  },
  editCopor: async (ctx) => {
    const payload = new Payload()
    try {
      const userInfo = await Auth.userInfo(ctx)
      if (userInfo === null) {
        payload.data = 'F'
        payload.result = false
        payload.message = '로그인이 되지 않은 상태입니다.'
      } else {
        const name = common.requestPost(ctx, 'name')
        const tell = common.requestPost(ctx, 'tell')
        const addr = common.requestPost(ctx, 'addr')
        const zip = common.requestPost(ctx, 'zip')
        const coidx = common.requestPostInt(ctx, 'coidx')
        await db.setCoporation(userInfo.useridx, coidx, name, tell, addr, zip)
        payload.result = true
        payload.message = '수정 되었습니다.'
      }
    } catch (err) {
      console.log(err)
      payload.message = '서버 에러입니다.'
      payload.result = false
    }
    ctx.body = payload.model()
  },
  removeCopor: async (ctx) => {
    const payload = new Payload()
    try {
      const userInfo = await Auth.userInfo(ctx)
      if (userInfo === null) {
        payload.data = 'F'
        payload.result = false
        payload.message = '로그인이 되지 않은 상태입니다.'
      } else {
        const coidx = common.requestPostInt(ctx, 'coidx')
        const check = await db.getCoprByCoidx(coidx)
        if (check.length > 0) {
          payload.result = false
          payload.message = '적용된 제품이 존재합니다.'
        } else {
          await db.removeCoporation(userInfo.useridx, coidx)
          payload.result = true
          payload.message = '삭제 되었습니다.'
        }
      }
    } catch (err) {
      console.log(err)
      payload.message = '서버 에러입니다.'
      payload.result = false
    }
    ctx.body = payload.model()
  },
}

export default controll

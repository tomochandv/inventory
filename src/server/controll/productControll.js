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

        const checkInfo = await db.getProductName(userInfo.useridx, caidx, subidx, botidx, name)
        if (checkInfo.length > 0) {
          payload.result = false
          payload.message = '동일한 제품이 존재 합니다.'
        } else {
          await db.addProduct(userInfo.useridx, caidx, subidx, botidx, name, desc, qty, 'Y')
          // const pridx = info.insertId
          // await db.addProductHistory(pridx, qty)
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
        const prnm = common.requestGet(ctx, 'prnm')
        const sdate = common.requestGet(ctx, 'sdate')
        const edate = common.requestGet(ctx, 'edate')
        const type = common.requestGet(ctx, 'type')
        const page = common.requestGetInt(ctx, 'page')
        const perPage = common.requestGetInt(ctx, 'perPage')
        const start = (page - 1) * perPage

        const list = await db.getProductHistoryList(start, perPage, userInfo.useridx, type, caidx, subidx, botidx, prnm, sdate, edate)
        const total = await db.getProductHistoryListCount(userInfo.useridx, type, caidx, subidx, botidx, prnm, sdate, edate)
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
}

export default controll

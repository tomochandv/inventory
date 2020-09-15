import Auth from '../lib/auth'
import db from '../db/productDb'
import Payload from '../model/payload'
import Common from '../lib/common'

const common = new Common()

const controll = {
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
}

export default controll

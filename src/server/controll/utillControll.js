import Payload from '../model/payload'
import db from '../db/utillDb'

const controll = {
  getNotice: async (ctx) => {
    const payload = new Payload()
    try {
      const list = await db.getNotice()
      payload.result = true
      payload.data = list
    } catch (err) {
      console.log(err)
      payload.data = err.message
      payload.result = false
      payload.message = '에러가 발생했습니다.'
    }
    ctx.body = payload.model()
  },
}

export default controll

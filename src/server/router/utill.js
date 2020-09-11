import Router from 'koa-router'
import controll from '../controll/utillControll'

const router = new Router()

router.get('/alert', controll.getNotice)

export default router

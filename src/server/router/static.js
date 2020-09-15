import Router from 'koa-router'
import controll from '../controll/staticControll'

const router = new Router()

router.get('/static/product', async (ctx) => {
  await ctx.render('static/product/list', { script: 'static/product/list' })
})

router.get('/static/product/list', controll.getStaticList)

export default router

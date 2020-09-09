import Router from 'koa-router'

const router = new Router()

router.get('/', async (ctx) => {
  await ctx.render('main', { script: 'main' })
})

router.get('/update', async (ctx) => {
  await ctx.render('update', { script: 'update' })
})

export default router

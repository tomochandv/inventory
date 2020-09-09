import Router from 'koa-router'
import controll from '../controll/userContorll'

const router = new Router()

router.get('/login', async (ctx) => {
  await ctx.render('user/login', { script: 'user/login' })
})

router.get('/register', async (ctx) => {
  await ctx.render('user/register', { script: 'user/register' })
})

router.get('/find', async (ctx) => {
  await ctx.render('user/find', { script: 'user/find' })
})

router.post('/register', controll.register)

router.get('/user/email/validate/:code', controll.validateEmail)

router.post('/recaptch', controll.recaptch)

router.post('/login', controll.login)

router.post('/find', controll.find)

router.get('/reset/:code', controll.reset)

router.post('/reset', controll.changePwd)

export default router

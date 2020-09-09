import Router from 'koa-router'
import controll from '../controll/productControll'

const router = new Router()

router.get('/category', async (ctx) => {
  await ctx.render('product/category', { script: 'product/category' })
})

router.get('/category/add', async (ctx) => {
  await ctx.render('product/categoryAdd', { script: 'product/categoryAdd' })
})

router.get('/product', async (ctx) => {
  await ctx.render('product/product', { script: 'product/product' })
})

router.get('/product/list', async (ctx) => {
  await ctx.render('product/productList', { script: 'product/productList' })
})

router.post('/category/add/1', controll.addFirstCategory)
router.get('/category/1', controll.getFirstCategory)
router.post('/category/add/2', controll.addSecondCategory)
router.get('/category/2', controll.getSecondCategory)
router.post('/category/add/3', controll.addThirdCategory)
router.get('/category/3', controll.getThirdCategory)

router.get('/category/list', controll.getCategoryList)
router.post('/category/remove', controll.removeCategory)
export default router

import combineRouters from 'koa-combine-routers'
import main from './main'
import user from './user'
import product from './product'
import utill from './utill'

const router = combineRouters(main, user, product, utill)

export default router

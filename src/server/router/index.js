import combineRouters from 'koa-combine-routers'
import main from './main'
import user from './user'
import product from './product'
import utill from './utill'
import statics from './static'

const router = combineRouters(main, user, product, utill, statics)

export default router

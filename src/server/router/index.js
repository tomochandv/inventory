import combineRouters from 'koa-combine-routers'
import main from './main'
import user from './user'
import product from './product'

const router = combineRouters(main, user, product)

export default router

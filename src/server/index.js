import Koa from 'koa'
import cors from '@koa/cors'
import logger from 'koa-logger'
import koaBody from 'koa-body'
import serve from 'koa-static'
import views from 'koa-views'
import { userAgent } from 'koa-useragent'
import path from 'path'
import router from './router'

const app = new Koa()
app.use(cors())
app.use(koaBody({ multipart: true }))
app.use(views(path.join(__dirname, '../client/views'), { extension: 'ejs' }))

app.use(serve(path.resolve('dist/client')))

app.use(userAgent)
app.use(logger())
app.use(router())
app.use(userAgent)
app.listen(4010, () => console.log('##server started http://localhost:4010'))

export default app

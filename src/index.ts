import Koa from 'koa'
import createRoutes from '@/routes'

const app = new Koa()
app.use(async (ctx, next) => {
	console.log('ctx', ctx)
	await next()
})
// 注册路由
createRoutes(app)

app.listen(4000, () => {
	console.log('服务启动成功！端口4000')
})

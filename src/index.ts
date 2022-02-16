import Koa from 'koa'
import createRoutes from '@/routes'
import BodyParser from 'koa-bodyparser'
// import jsonwebtoken from 'jsonwebtoken';
import koaJWT from 'koa-jwt'
import { isEnv, SECRET } from '@/config/constant'
// import redisStore from 'koa-redis'

const app = new Koa()
app.use(BodyParser())
// 错误处理
app.use(async (ctx, next) => {
	next().catch((error) => {
		if (error.status === 401) {
			ctx.status = 401
			ctx.body = {
				code: -1,
				data: null,
				message: 'token error 401',
			}
		} else {
			throw error
		}
	})
})

app.use(
	koaJWT({
		secret: SECRET,
		debug: isEnv,
		// key: 'user',
		// ctx.state中可以访问到
		tokenKey: 'token',
		getToken(ctx) {
			// console.log('--authorization--', ctx.headers.authorization)
			return ctx.headers.authorization || null
		},
	}).unless({
		path: [/^\/api\/user/],
	}),
)

// 注册路由
createRoutes(app)

app.listen(4000, () => {
	console.log('服务启动成功！端口4000')
})

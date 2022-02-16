import Application from 'koa'
import userRouter from './user'
import contentRouter from './content'

export default (app: Application) => {
	app.use(userRouter.routes()).use(userRouter.allowedMethods())
	app.use(contentRouter.routes()).use(contentRouter.allowedMethods())
}

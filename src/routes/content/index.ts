import KoaRouter from 'koa-router'
const router = new KoaRouter({
	prefix: '/api/content/',
})

router.post('list', async (ctx) => {
	// await next()
	console.log('ctx----state---user', ctx.state.user)
	ctx.body = { message: 'list', data: [] }
})

export default router

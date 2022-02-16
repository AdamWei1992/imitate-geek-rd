import KoaRouter from 'koa-router'
import { login, register } from '@/controller/user'
import jsonwebtoken from 'jsonwebtoken'
import { SECRET } from '@/config/constant'
export interface IUserInfo {
	username: string
	password: string
	realname?: string
}

const router = new KoaRouter({
	prefix: '/api/user/',
})

router.post('login', async (ctx) => {
	const userinfo = ctx.request.body as IUserInfo
	const res = await login(userinfo)
	if (res.username) {
		ctx.body = {
			message: '登录成功！！！',
			data: {
				token: jsonwebtoken.sign(
					{
						name: userinfo.username,
						id: userinfo.password,
					},
					SECRET,
					{
						expiresIn: '1h',
					},
				),
			},
		}
		return
	}
	ctx.body = { message: '登录失败！！！', data: null }
})

router.post('regist', async (ctx) => {
	const userinfo = ctx.request.body as IUserInfo

	const { id, status } = await register(userinfo)

	ctx.body = { message: status, data: { id } }
})

export default router

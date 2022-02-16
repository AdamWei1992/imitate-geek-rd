import { execute, escape } from '@/db/mysql'
import { IUserInfo } from '@/routes/user'
import { encryptPassword } from '@/utils/cryp'
import { OkPacket, RowDataPacket } from 'mysql2'
import xss from 'xss'

// 处理用户名、密码信息
function handleUserInfo({ username, password, realname = '无名' }: IUserInfo) {
	// 防止sql注入
	username = escape(username)
	// 防止xss
	username = xss(username)
	// 加密
	password = encryptPassword(password)
	// 防止sql注入
	password = escape(password)
	password = xss(password)

	// 防止sql注入
	realname = escape(realname)
	realname = xss(realname)

	return { username, password, realname }
}

const login = async (userInfo: IUserInfo) => {
	const { username, password } = handleUserInfo(userInfo)
	const sql = `select username, realname from users where username=${username} and password=${password}`

	console.log('login sql is: ', sql)

	const res = await execute<RowDataPacket[]>(sql)
	return res[0] || {}
}

const register = async (userInfo: IUserInfo) => {
	const { username, password, realname } = handleUserInfo(userInfo)

	const querySql = `
    select * from users where username=${username}
  `
	let result
	try {
		result = await execute<RowDataPacket[]>(querySql)
	} catch (error) {
		console.log('查询错误！', error)
	}

	if (result && result[0]) {
		return { id: null, status: 'repeat' }
	}

	const insertSql = `
    insert into users (username, realname, password)
    values (${username}, ${realname}, ${password})
  `

	let res = null
	let status = 'success'
	try {
		res = await execute<OkPacket>(insertSql)
	} catch (error) {
		status = 'error'
	}

	return { id: res?.insertId || null, status }
}

export { login, register }

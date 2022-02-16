import crypto from 'crypto'

const SECRET_KEY = 'yewei382'

function md5Fun(content: string) {
	const md5 = crypto.createHash('md5')
	return md5.update(content).digest('hex')
}

function encryptPassword(password: string) {
	const str = `password=${password}&key=${SECRET_KEY}`
	return md5Fun(str)
}

export { encryptPassword }

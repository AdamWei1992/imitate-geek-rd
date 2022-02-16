import { ConnectionOptions } from 'mysql2/typings/mysql'
import { isEnv } from './constant'

let MYSQL_CONFIG: ConnectionOptions
// let REDIS_CONFIG: ;

if (isEnv) {
	MYSQL_CONFIG = {
		host: '127.0.0.1',
		port: 3306,
		user: 'root',
		password: 'ye2582525775',
		database: 'imitate',
	}
} else {
	MYSQL_CONFIG = {
		host: 'localhost',
		user: 'root',
		password: 'ye2582525775',
		port: 3306,
		database: 'imitate',
	}
}

export { MYSQL_CONFIG }

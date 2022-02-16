import mysql, { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2'
import { MYSQL_CONFIG } from '@/config/db'

const sql = mysql.createConnection(MYSQL_CONFIG)
// 数据库链接
sql.connect()

type S =
	| RowDataPacket[][]
	| RowDataPacket[]
	| OkPacket
	| OkPacket[]
	| ResultSetHeader

// interface IExecute {
//   <T extends S>(str: string): Promise<T>
// }

// type IExecute = <T extends S>(str: string) => Promise<T>;
// 执行sql语句
const execute = <T extends S>(sqlStr: string): Promise<T> => {
	return new Promise((resolve, reject) => {
		sql.query(sqlStr, (err, result) => {
			if (err) {
				reject(err)
				return
			}

			resolve(result as T)
		})
	})
}

const escape = mysql.escape

export { execute, escape }

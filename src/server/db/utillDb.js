import Mysql from '../lib/mysql'

const mysql = new Mysql()

const db = {
  getNotice: async () => {
    try {
      const qry = `SELECT * 
        FROM main_notice where use_yn = 'Y'`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
}

export default db

import mysql from 'mysql2/promise'
import config from '../config'

// let connectionInfo = config.db.local
// if (process.env.NODE_ENV === 'development') {
//   connectionInfo = config.db.dev
// } else if (process.env.NODE_ENV === 'production') {
//   connectionInfo = config.db.staging
// }

/**
 * mysql 라이브러리
 * @class Mysql 생성자 없음.
 */
class Mysql {
  constructor() {
    this.connectionInfo = config.db.local
    if (process.env.NODE_ENV === 'development') {
      this.connectionInfo = config.db.dev
    } else if (process.env.NODE_ENV === 'production') {
      this.connectionInfo = config.db.staging
    }
    this.pool = mysql.createPool(this.connectionInfo)
    this.conn = null
  }

  /**
   * 일반 쿼리문
   * @param {String} qry 쿼리
   * @returns {Object} Mysql Object
   * @memberof Mysql
   */
  async query(qry) {
    try {
      this.qry = qry
      const [rows] = await this.pool.query(this.qry)
      return rows
    } catch (err) {
      throw err
    }
  }

  /**
   * 쿼리와 파라미터 배열. 쿼리에 인자는 ? 로 표시
   * @param {String} qry 쿼리
   * @param {Array} params 파라미터 배열
   * @returns {Object} Mysql Object
   * @memberof Mysql
   */
  async queryParams(qry, params) {
    try {
      this.qry = qry
      this.params = params
      const [rows] = await this.pool.query(this.qry, this.params)
      return rows
    } catch (err) {
      throw err
    }
  }

  /**
   * transaction 시작
   * @memberof Mysql
   */
  async tranStart() {
    try {
      this.conn = await this.pool.getConnection()
      await this.conn.beginTransaction()
    } catch (err) {
      throw err
    }
  }

  /**
   * transaction query
   * @param {String} qry 쿼리
   * @returns {Object} Mysql Object
   * @memberof Mysql
   */
  async tranQuery(qry) {
    try {
      const [rows] = await this.conn.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  }

  /**
   * transaction commit
   * @memberof Mysql
   */
  async commit() {
    try {
      await this.conn.commit()
      this.conn.release()
    } catch (err) {
      throw err
    }
  }

  /**
   * transaction rollback
   * @memberof Mysql
   */
  async rollBack() {
    try {
      await this.conn.rollback()
      this.conn.release()
    } catch (err) {
      throw err
    }
  }
}

export default Mysql

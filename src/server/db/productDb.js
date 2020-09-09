import Mysql from '../lib/mysql'

const mysql = new Mysql()

const db = {
  addFirstCategory: async (useridx, nm) => {
    try {
      const qry = `INSERT INTO category_info(useridx, ca_nm, regdate)
      VALUES('${useridx}', '${nm}', NOW())`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  getFirstCategory: async (useridx) => {
    try {
      const qry = `SELECT * FROM category_info WHERE useridx = ${useridx} order by ca_nm asc`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  getFirstCategoryName: async (useridx, name) => {
    try {
      const qry = `SELECT * FROM category_info WHERE useridx = ${useridx} AND ca_nm = '${name}'`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  addSecondCategory: async (caidx, nm) => {
    try {
      const qry = `INSERT INTO category_depth1(caidx, sub_nm, regdate)
      VALUES('${caidx}', '${nm}', NOW())`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  getSecondCategory: async (caidx) => {
    try {
      const qry = `SELECT * FROM category_depth1 WHERE caidx = ${caidx} order by sub_nm asc`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  getSecondCategoryName: async (caidx, name) => {
    try {
      const qry = `SELECT * FROM category_depth1 WHERE caidx = ${caidx} AND sub_nm = '${name}'`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  addThirdCategory: async (subidx, nm) => {
    try {
      const qry = `INSERT INTO category_depth2(subidx, bot_nm, regdate)
      VALUES('${subidx}', '${nm}', NOW())`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  getThirdCategory: async (subidx) => {
    try {
      const qry = `SELECT * FROM category_depth2 WHERE subidx = ${subidx} order by bot_nm asc`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  getThirdCategoryName: async (subidx, name) => {
    try {
      const qry = `SELECT * FROM category_depth2 WHERE subidx = ${subidx} AND bot_nm = '${name}'`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  getCategoryList: async (useridx, caidx, subidx, botidx) => {
    try {
      let qry = `SELECT 
        a.caidx, a.useridx, a.ca_nm, b.subidx, b.sub_nm, c.botidx, c.bot_nm
      FROM 
      category_info a 
      LEFT OUTER JOIN category_depth1 b ON a.caidx = b.caidx
      LEFT OUTER JOIN category_depth2 c ON b.subidx = c.subidx
      WHERE useridx = ${useridx} `
      if (caidx !== 0) {
        qry += ` AND a.caidx = ${caidx}`
      }
      if (subidx !== 0) {
        qry += ` AND b.subidx = ${subidx}`
      }
      if (botidx !== 0) {
        qry += ` AND c.botidx = ${botidx}`
      }
      qry += ' ORDER BY a.ca_nm, b.sub_nm, c.bot_nm'
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  getProductCount: async (useridx, botidx) => {
    try {
      const qry = `SELECT COUNT(1) AS total FROM products_info WHERE botidx = ${botidx} and useridx = ${useridx}`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  addProduct: async (useridx, botidx, prnm, prdesc, qty, useyn) => {
    try {
      const qry = `INSERT INTO products_info(botidx, useridx, pr_nm, pr_desc, qty, use_yn, regdate)
      VALUES(${botidx}, ${useridx}, '${prnm}', '${prdesc}', ${qty}, '${useyn}', now())`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  addProductHistory: async (pridx, qty) => {
    try {
      const qry = `INSERT INTO products_history(pridx, qty, regdate)
      VALUES(${pridx}, ${qty}, now())`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  removeCategoryInfo: async (caidx) => {
    try {
      const qry = `DELETE FROM category_info WHERE caidx = ${caidx}`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  removeCategoryDepth1: async (subidx) => {
    try {
      const qry = `DELETE FROM category_depth1 WHERE subidx = ${subidx}`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  removeCategoryDepth2: async (botidx) => {
    try {
      const qry = `DELETE FROM category_depth2 WHERE botidx = ${botidx}`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
}

export default db

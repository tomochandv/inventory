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
  addProduct: async (useridx, caidx, subidx, botidx, prnm, prdesc, qty, useyn) => {
    try {
      const qry = `INSERT INTO products_info(caidx, subidx, botidx, useridx, pr_nm, pr_desc, qty, use_yn, regdate)
      VALUES(${caidx},${subidx},${botidx}, ${useridx}, '${prnm}', '${prdesc}', ${qty}, '${useyn}', now())`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  getProductName: async (useridx, caidx, subidx, botidx, prnm) => {
    try {
      const qry = `select * from products_info 
      where caidx = ${caidx} and subidx = ${subidx} and botidx = ${botidx} 
      and useridx = ${useridx} and pr_nm = '${prnm}'`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  addProductHistory: async (pridx, qty, price) => {
    try {
      const qry = `INSERT INTO products_history(pridx, qty, price, regdate)
      VALUES(${pridx}, ${qty}, ${price}, now())`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  setProductQty: async (pridx, qty) => {
    try {
      const qry = `update products_info set qty = qty + ${qty} where pridx = ${pridx}`
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
  getProductList: async (useridx, caidx, subidx, botidx, prnm) => {
    try {
      let qry = `SELECT 
          a.pridx, a.caidx, a.subidx, a.botidx, a.useridx, a.qty, b.ca_nm, c.sub_nm, d.bot_nm, a.pr_nm, a.pr_desc
          , IFNULL(co.coidx, 0) AS coidx, IFNULL(co.co_nm, '없음') AS co_nm
        FROM products_info a
        INNER JOIN category_info b ON a.caidx = b.caidx
        INNER JOIN category_depth1 c ON a.subidx = c.subidx
        INNER JOIN category_depth2 d ON a.botidx = d.botidx
        LEFT OUTER JOIN products_co pco ON a.pridx = pco.pridx
        LEFT OUTER JOIN co_info co ON pco.coidx = co.coidx
        WHERE a.useridx = ${useridx}
          AND a.pr_desc LIKE '%${prnm}%'`
      if (caidx !== 0) {
        qry += ` AND a.caidx = ${caidx}`
      }
      if (subidx !== 0) {
        qry += ` AND a.subidx = ${subidx}`
      }
      if (botidx !== 0) {
        qry += ` AND a.botidx = ${botidx}`
      }
      qry += ' ORDER BY b.ca_nm, c.sub_nm, d.bot_nm, a.pr_nm'
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  getProductDetail: async (useridx, pridx) => {
    try {
      const qry = `SELECT 
          a.pridx, a.caidx, a.subidx, a.botidx, a.useridx, a.qty, b.ca_nm, c.sub_nm, d.bot_nm, a.pr_nm, a.pr_desc
          , IFNULL(co.coidx, 0) AS coidx, IFNULL(co.co_nm, '없음') AS co_nm
        FROM products_info a
        INNER JOIN category_info b ON a.caidx = b.caidx
        INNER JOIN category_depth1 c ON a.subidx = c.subidx
        INNER JOIN category_depth2 d ON a.botidx = d.botidx
        LEFT OUTER JOIN products_co pco ON a.pridx = pco.pridx
        LEFT OUTER JOIN co_info co ON pco.coidx = co.coidx
        WHERE a.useridx = ${useridx} and a.pridx = ${pridx}`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  setProduct: async (useridx, pridx, caidx, subidx, botidx, prnm, desc) => {
    try {
      const qry = `UPDATE products_info
      SET
          caidx = ${caidx},
          subidx = ${subidx},
          botidx = ${botidx},
          pr_nm = '${prnm}', 
          pr_desc = '${desc}'
      WHERE pridx = ${pridx} and useridx = ${useridx}`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  removeProduct: async (pridx) => {
    try {
      let qry = `DELETE FROM products_history WHERE pridx = ${pridx}`
      await mysql.query(qry)
      qry = `DELETE FROM products_co WHERE pridx = ${pridx}`
      await mysql.query(qry)
      qry = `DELETE FROM products_info WHERE pridx = ${pridx}`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  getProductHistoryList: async (start, offlimit, useridx, type, caidx, subidx, botidx, coidx, prnm, sdate, edate) => {
    try {
      let qry = `SELECT 
          c1.ca_nm, c2.sub_nm, c3.bot_nm, pr.pr_nm, pr.pr_desc
          , a.pridx, a.qty, a.price, a.regdate
          , IFNULL(co.coidx, 0) AS coidx, IFNULL(co.co_nm, '없음') AS co_nm
        FROM products_history a
        INNER JOIN products_info pr ON a.pridx = pr.pridx
        INNER JOIN category_info c1 ON pr.caidx = c1.caidx
        INNER JOIN category_depth1 c2 ON pr.subidx = c2.subidx
        INNER JOIN category_depth2 c3 ON pr.botidx = c3.botidx
        LEFT OUTER JOIN products_co pco ON a.pridx = pco.pridx
        LEFT OUTER JOIN co_info co ON pco.coidx = co.coidx
        WHERE pr.useridx = ${useridx}
          AND pr.pr_desc LIKE '%${prnm}%'`
      if (caidx !== 0) {
        qry += ` AND pr.caidx = ${caidx}`
      }
      if (subidx !== 0) {
        qry += ` AND pr.subidx = ${subidx}`
      }
      if (botidx !== 0) {
        qry += ` AND pr.botidx = ${botidx}`
      }
      if (sdate !== '') {
        qry += ` AND a.regdate BETWEEN '${sdate} 00:00:00' AND '${edate} 23:59:59'`
      }
      if (type !== '') {
        qry += ` AND a.qty ${type} 0`
      }
      if (coidx !== 0) {
        qry += ` AND pco.coidx = ${coidx}`
      }
      qry += ` ORDER BY a.regdate desc limit ${start}, ${offlimit}`

      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  getProductHistoryListCount: async (useridx, type, caidx, subidx, botidx, coidx, prnm, sdate, edate) => {
    try {
      let qry = `SELECT 
        COUNT(1) AS total
        FROM products_history a
        INNER JOIN products_info pr ON a.pridx = pr.pridx
        LEFT OUTER JOIN products_co pco ON a.pridx = pco.pridx
        LEFT OUTER JOIN co_info co ON pco.coidx = co.coidx
        WHERE pr.useridx = ${useridx}
          AND pr.pr_desc LIKE '%${prnm}%'`
      if (caidx !== 0) {
        qry += ` AND pr.caidx = ${caidx}`
      }
      if (subidx !== 0) {
        qry += ` AND pr.subidx = ${subidx}`
      }
      if (botidx !== 0) {
        qry += ` AND pr.botidx = ${botidx}`
      }
      if (sdate !== '') {
        qry += ` AND a.regdate BETWEEN '${sdate} 00:00:00' AND '${edate} 23:59:59'`
      }
      if (type !== '') {
        qry += ` AND a.qty ${type} 0`
      }
      if (coidx !== 0) {
        qry += ` AND pco.coidx = ${coidx}`
      }

      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  getProductStaticList: async (start, offlimit, useridx, type, caidx, subidx, botidx, prnm, sdate, edate) => {
    try {
      let qry = `SELECT 
          c1.ca_nm, c2.sub_nm, c3.bot_nm, pr.pr_nm, pr.pr_desc
          , a.pridx
          , SUM(a.qty) AS qty, SUM(a.price) AS price
        FROM products_history a
        INNER JOIN products_info pr ON a.pridx = pr.pridx
        INNER JOIN category_info c1 ON pr.caidx = c1.caidx
        INNER JOIN category_depth1 c2 ON pr.subidx = c2.subidx
        INNER JOIN category_depth2 c3 ON pr.botidx = c3.botidx
        WHERE pr.useridx = ${useridx}
          AND pr.pr_desc LIKE '%${prnm}%'`
      if (caidx !== 0) {
        qry += ` AND pr.caidx = ${caidx}`
      }
      if (subidx !== 0) {
        qry += ` AND pr.subidx = ${subidx}`
      }
      if (botidx !== 0) {
        qry += ` AND pr.botidx = ${botidx}`
      }
      if (sdate !== '') {
        qry += `AND a.regdate BETWEEN '${sdate} 00:00:00' AND '${edate} 23:59:59'`
      }
      if (type !== '') {
        qry += `AND a.qty ${type} 0`
      }
      qry += ` GROUP BY c1.ca_nm, c2.sub_nm, c3.bot_nm, pr.pr_nm, pr.pr_desc, a.pridx ORDER BY a.regdate desc limit ${start}, ${offlimit}`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  getProductStaticListCount: async (useridx, type, caidx, subidx, botidx, prnm, sdate, edate) => {
    try {
      let qry = `SELECT 
          COUNT(1) AS total
        FROM products_history a
        INNER JOIN products_info pr ON a.pridx = pr.pridx
        INNER JOIN category_info c1 ON pr.caidx = c1.caidx
        INNER JOIN category_depth1 c2 ON pr.subidx = c2.subidx
        INNER JOIN category_depth2 c3 ON pr.botidx = c3.botidx
        WHERE pr.useridx = ${useridx}
          AND pr.pr_desc LIKE '%${prnm}%'`
      if (caidx !== 0) {
        qry += ` AND pr.caidx = ${caidx}`
      }
      if (subidx !== 0) {
        qry += ` AND pr.subidx = ${subidx}`
      }
      if (botidx !== 0) {
        qry += ` AND pr.botidx = ${botidx}`
      }
      if (sdate !== '') {
        qry += `AND a.regdate BETWEEN '${sdate} 00:00:00' AND '${edate} 23:59:59'`
      }
      if (type !== '') {
        qry += `AND a.qty ${type} 0`
      }
      qry += ' GROUP BY c1.ca_nm, c2.sub_nm, c3.bot_nm, pr.pr_nm, pr.pr_desc'
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  addCoporation: async (useridx, name, tell, addr, zip) => {
    try {
      const qry = `INSERT INTO co_info(useridx, regdate, co_nm, co_tell, co_addr, zip)
        VALUES(${useridx}, NOW(), '${name}', '${tell}', '${addr}', '${zip}')`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  addCoPr: async (pridx, coidx) => {
    try {
      const qry = `INSERT INTO products_co(pridx, coidx)
        VALUES(${pridx}, ${coidx})`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  removeCoPr: async (pridx) => {
    try {
      const qry = `delete from products_co where pridx = ${pridx}`
      console.log(qry)
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  getCoprByCoidx: async (coidx) => {
    try {
      const qry = `select * from products_co where coidx = ${coidx}`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  getCoprByPridx: async (pridx) => {
    try {
      const qry = `select * from products_co where pridx = ${pridx}`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  setCoporation: async (useridx, coidx, name, tell, addr, zip) => {
    try {
      const qry = `update co_info set co_nm = '${name}', co_tell = '${tell}', co_addr = '${addr}', zip = '${zip}'
        where useridx = ${useridx} and coidx = ${coidx}`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  removeCoporation: async (useridx, coidx) => {
    try {
      const qry = `delete from co_info
        where useridx = ${useridx} and coidx = ${coidx}`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  getCoporationDetail: async (coidx, useridx) => {
    try {
      const qry = `SELECT * FROM co_info where useridx = ${useridx} and coidx = ${coidx}`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  getCoporationList: async (start, row, useridx, name) => {
    try {
      const qry = `SELECT * FROM co_info where useridx = ${useridx} and co_nm like '%${name}%' order by co_nm asc
       limit ${start}, ${row}`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  getCoporationCount: async (useridx, name) => {
    try {
      const qry = `SELECT count(1) as total FROM co_info where useridx = ${useridx} and co_nm like '%${name}%'`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
}

export default db

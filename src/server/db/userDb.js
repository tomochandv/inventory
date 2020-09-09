import Mysql from '../lib/mysql'

const mysql = new Mysql()

const db = {
  addUser: async (email, pwd) => {
    try {
      const qry = `INSERT INTO user_info(email, pass, use_yn, regdate)
      VALUES('${email}', '${pwd}', '0', NOW())`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  setUser: async (email, status) => {
    try {
      const qry = `update user_info set use_yn = '${status}' where email = '${email}'`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  getUserByEmail: async (email) => {
    try {
      const qry = `SELECT * FROM user_info WHERE email = '${email}'`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  getUserByUseridx: async (useridx) => {
    try {
      const qry = `SELECT * FROM user_info WHERE useridx = '${useridx}'`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  setUserPwd: async (email, pwd) => {
    try {
      const qry = `update user_info set pass = '${pwd}' where email = '${email}'`
      const rows = await mysql.query(qry)
      return rows
    } catch (err) {
      throw err
    }
  },
  addLoginHistory: async (email, ip, isSuccess, agent) => {
    try {
      const qry = `INSERT INTO user_login 
      (email, ip, is_success, regdate, 
        isYaBrowser, isAuthoritative, isMobile, isMobileNative, isTablet, isiPad, isiPod, isiPhone, isiPhoneNative,
        isAndroid, isAndroidNative, isBlackberry, isOpera, isIE, isEdge, 
        isIECompatibilityMode, isSafari, isFirefox, isWebkit, isChrome, isKonqueror, isOmniWeb, isSeaMonkey,
        isFlock, isAmaya, isPhantomJS, isEpiphany, isDesktop, isWindows, 
        isLinux, isLinux64, isMac, isChromeOS, isBada, isSamsung, isRaspberry, isBot, isCurl,
        isAndroidTablet, isWinJs, isKindleFire, isSilk, isCaptive, isSmartTV, 
        isUC, isFacebook, isAlamoFire, isElectron, silkAccelerated, browser, version, os, platform,
        source, isWechat, electronVersion)
      VALUES('${email}', '${ip}', '${isSuccess}', NOW(),
        ?, ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?
        )`
      const rows = await mysql.queryParams(qry, agent)
      return rows
    } catch (err) {
      throw err
    }
  },
}

export default db

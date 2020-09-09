import axios from 'axios'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import util from 'util'
import Security from '../lib/security'
import db from '../db/userDb'
import Common from '../lib/common'
import Email from '../lib/email'
import config from '../config'
import Payload from '../model/payload'

const common = new Common()
const payload = new Payload()

const controll = {
  register: async (ctx) => {
    try {
      const email = common.requestPost(ctx, 'email')
      const pwd = common.requestPost(ctx, 'pwd')
      const checkInfo = await db.getUserByEmail(email)
      if (checkInfo.length > 0) {
        payload.data = null
        payload.result = false
        payload.message = '존재 하는 이메일 입니다.'
      } else {
        await db.addUser(email, Security.encript(pwd))
        const url = process.env.NODE_ENV === 'production' ? config.siteUrl.staging : config.siteUrl.local
        Email.sendAuth(email, `${url}/user/email/validate/${escape(Security.encript(email).split('/').join('||'))}`)
        payload.result = true
        payload.message = '저장되었습니다. 이메일 인증 후 로그인 가능합니다.'
      }
    } catch (err) {
      console.log(err)
      payload.data = err.message
      payload.result = false
      payload.message = '에러가 발생했습니다.'
    }
    ctx.body = payload.model()
  },
  validateEmail: async (ctx) => {
    try {
      const code = unescape(ctx.params.code.split('||').join('/'))
      const email = Security.decrypt(code)
      const checkInfo = await db.getUserByEmail(email)
      if (checkInfo.length > 0 && checkInfo[0].use_yn === '0') {
        await db.setUser(email, '1')
        payload.result = true
        payload.data = null
        payload.message = '인증 되었습니다.'
      } else {
        payload.result = false
        payload.data = null
        payload.message = '이미 인증 진행이 된 이메일 입니다.'
      }
    } catch (err) {
      payload.result = false
      payload.message = '인증 에러.'
    }
    await ctx.render('user/validate', { script: 'user/validate', payload: payload.model() })
  },
  recaptch: async (ctx) => {
    try {
      const keys = await fs.readFileSync(path.join(__dirname, '../lib/keys/recaptch'), 'utf-8')
      const result = await axios({
        url: 'https://www.google.com/recaptcha/api/siteverify',
        method: 'post',
        params: {
          secret: keys,
          response: common.requestPost(ctx, 'recaptcha'),
        },
      })
      if (result.data.success) {
        payload.data = null
        payload.result = true
        payload.message = ''
      }
    } catch (err) {
      payload.result = false
      payload.message = '리캡차 에러.'
    }
    ctx.body = payload.model()
  },
  login: async (ctx) => {
    try {
      const email = common.requestPost(ctx, 'email')
      const pwd = common.requestPost(ctx, 'pwd')
      const checkInfo = await db.getUserByEmail(email)
      if (checkInfo.length > 0 && checkInfo[0].use_yn === '1') {
        const dbPwd = Security.decrypt(checkInfo[0].pass)
        if (pwd === dbPwd) {
          const json = {
            email,
            useridx: checkInfo[0].useridx,
          }
          const keys = await fs.readFileSync(path.join(__dirname, '../lib/keys/tokenKey'), 'utf-8')
          const tokenPaylod = await jwt.sign(json, keys, { expiresIn: '1d' })
          payload.data = {
            token: tokenPaylod,
            email,
          }
          payload.result = true
          payload.message = '로그인 되었습니다.'
        } else {
          payload.result = false
          payload.data = null
          payload.message = '비밀번호가 정확하지 않습니다.'
        }
      } else {
        payload.result = false
        payload.data = null
        payload.message = '없는 이메일 주소이거나 인증되지 않은 이메일 주소 입니다.'
      }
      controll.loginHistory(ctx, email, payload.result)
    } catch (err) {
      console.log(err)
      payload.result = false
      payload.message = '로그인 에러.'
    }
    ctx.body = payload.model()
  },
  loginHistory: async (ctx, email, isSuccess) => {
    try {
      const ip = common.getIp(ctx)
      const agent = ctx.userAgent
      const params = [
        agent.isyabrowser,
        agent.isauthoritative,
        agent.ismobile,
        agent.ismobilenative,
        agent.istablet,
        agent.isipad,
        agent.isipod,
        agent.isiphone,
        agent.isiphonenative,
        agent.isandroid,
        agent.isandroidnative,
        agent.isblackberry,
        agent.isopera,
        agent.isie,
        agent.isedge,
        agent.isiecompatibilitymode,
        agent.issafari,
        agent.isfirefox,
        agent.iswebkit,
        agent.ischrome,
        agent.iskonqueror,
        agent.isomniweb,
        agent.isseamonkey,
        agent.isflock,
        agent.isamaya,
        agent.isphantomjs,
        agent.isepiphany,
        agent.isdesktop,
        agent.iswindows,
        agent.islinux,
        agent.islinux64,
        agent.ismac,
        agent.ischromeos,
        agent.isbada,
        agent.issamsung,
        agent.israspberry,
        agent.isbot,
        agent.iscurl,
        agent.isandroidtablet,
        agent.iswinjs,
        agent.iskindlefire,
        agent.issilk,
        agent.iscaptive,
        agent.issmarttv,
        agent.isuc,
        agent.isfacebook,
        agent.isalamofire,
        agent.iselectron,
        agent.silkaccelerated,
        agent.browser,
        agent.version,
        agent.os,
        agent.platform,
        agent.source,
        agent.iswechat,
        agent.electronversion,
      ]
      await db.addLoginHistory(email, ip, isSuccess === true ? 'S' : 'F', params)
    } catch (err) {
      throw err
    }
  },
  find: async (ctx) => {
    try {
      const emails = common.requestPost(ctx, 'email')
      const checkInfo = await db.getUserByEmail(emails)
      if (checkInfo.length > 0 && checkInfo[0].use_yn === '1') {
        const url = process.env.NODE_ENV === 'production' ? config.siteUrl.staging : config.siteUrl.local
        const keys = await fs.readFileSync(path.join(__dirname, '../lib/keys/tokenKey'), 'utf-8')
        const tokenPaylod = await jwt.sign({ emails }, keys, { expiresIn: 1800 })
        Email.sendPwd(emails, `${url}/reset/${escape(tokenPaylod)}`)
        payload.result = true
        payload.message = '이메일을 확인하세요.'
      } else {
        payload.result = false
        payload.data = null
        payload.message = '없는 이메일 주소이거나 인증되지 않은 이메일 주소 입니다.'
      }
    } catch (err) {
      console.log(err)
      payload.result = false
      payload.message = '비번 찾기 에러.'
    }
    ctx.body = payload.model()
  },
  reset: async (ctx) => {
    try {
      const code = ctx.params.code
      const keys = await fs.readFileSync(path.join(__dirname, '../lib/keys/tokenKey'), 'utf-8')
      const info = jwt.verify(code, keys)
      if (info.email !== undefined && info.email !== null) {
        payload.result = true
        payload.data = code
      }
    } catch (err) {
      console.log(err)
      payload.result = false
      payload.message = '유효한 토큰이 아닙니다.'
    }
    await ctx.render('user/reset', { script: 'user/reset', payload: payload.model() })
  },
  changePwd: async (ctx) => {
    try {
      const code = common.requestPost(ctx, 'code')
      const pwd = common.requestPost(ctx, 'pwd')
      const keys = await fs.readFileSync(path.join(__dirname, '../lib/keys/tokenKey'), 'utf-8')
      const info = jwt.verify(code, keys)
      const emils = info.email
      const checkInfo = await db.getUserByEmail(emils)
      if (checkInfo.length > 0 && checkInfo[0].use_yn === '1') {
        const pass = Security.encript(pwd)
        await db.setUserPwd(emils, pass)
        payload.message = '비밀번호가 변경이 되었습니다.'
        payload.result = true
      } else {
        payload.result = false
        payload.data = null
        payload.message = '없는 이메일 주소이거나 인증되지 않은 이메일 주소 입니다.'
      }
    } catch (err) {
      console.log(err)
      payload.result = false
      payload.message = '비밀번호 변경 에러.'
    }
    ctx.body = payload.model()
  },
}

export default controll

import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

class Auth {
  static async userInfo(ctx) {
    this.ctx = ctx
    let info = null
    try {
      const keys = await fs.readFileSync(path.join(__dirname, './keys/tokenKey'), 'utf-8')
      const header = this.ctx.request.headers['bears-xxxx']
      const verify = jwt.verify(header, keys)
      if (verify !== false) {
        info = verify
      }
    } catch (err) {
      info = null
    }
    return info
  }
}

export default Auth

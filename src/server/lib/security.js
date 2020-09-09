import NodeRSA from 'node-rsa'
import fs from 'fs'
import path from 'path'

class Security {
  constructor() {
    this.privateKey = fs.readFileSync(path.join(__dirname, 'keys/private'), 'utf-8')
    this.publicKey = fs.readFileSync(path.join(__dirname, 'keys/public'), 'utf-8')
  }

  static encript(txt) {
    this.txt = txt
    let encTxt = ''
    try {
      this.publicKey = fs.readFileSync(path.join(__dirname, 'keys/public'), 'utf-8')
      const key = new NodeRSA(this.publicKey)
      encTxt = key.encrypt(this.txt, 'base64')
    } catch (err) {
      throw err
    }
    return encTxt
  }

  static decrypt(txt) {
    this.txt = txt
    let encTxt = ''
    try {
      this.privateKey = fs.readFileSync(path.join(__dirname, 'keys/private'), 'utf-8')
      const key = new NodeRSA(this.privateKey)
      encTxt = key.decrypt(this.txt, 'utf8')
    } catch (err) {
      throw err
    }
    return encTxt
  }
}

export default Security

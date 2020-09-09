/**
 * API model class
 * @module Payload
 */
class Payload {
  constructor() {
    this.result = false
    this.data = null
    this.message = null
  }

  model() {
    const reData = {
      result: this.result,
      data: this.data,
      message: this.message,
    }
    return reData
  }
}

export default Payload

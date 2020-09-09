import validator from 'validator'

class CommonLib {
  static onlyNumEvent(element) {
    element.addEventListener('keyup', () => {
      const ol = element.value
      const result = validator.isInt(ol)
      if (result === false) {
        const el = element
        el.value = ol.substring(0, ol.length - 1)
      }
    })
  }

  static emailValidateEvent(element) {
    element.addEventListener('blur', () => {
      const result = validator.isEmail(element.value)
      if (result === false) {
        const el = element
        el.value = ''
      }
    })
  }
}

export default CommonLib

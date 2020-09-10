import axios from 'axios'
import swal from 'sweetalert'
import Auth from './auth'

console.log(process.env.NODE_ENV)
const config = {
  backendUrl: {
    local: 'http://localhost:4010',
    staging: 'http://127.0.0.1:5002',
  },
}

const baseURL = process.env.NODE_ENV === 'production' ? config.backendUrl.staging : config.backendUrl.local

const normalAxios = axios.create({
  baseURL,
  headers: {
    enctype: 'multipart/form-data',
  },
})

const loginAxios = axios.create({
  baseURL,
  headers: {
    'bears-xxxx': Auth.headerToken(),
    enctype: 'multipart/form-data',
  },
})

// 요청 인터셉터
normalAxios.interceptors.request.use((configs) => {
  // 요청 전에 로딩 오버레이 띄우기
  document.querySelector('#ajaxloader').classList.add('d-flex')
  return configs
}, (error) => {
  // 에라 나면 로딩 끄기
  document.querySelector('#ajaxloader').classList.remove('d-flex')
  return Promise.reject(error)
})

// 응답 인터셉터
normalAxios.interceptors.response.use((response) => {
  // 응답 받으면 로딩 끄기
  document.querySelector('#ajaxloader').classList.remove('d-flex')
  return response
}, (error) => {
  // 응답 에러 시에도 로딩 끄기
  document.querySelector('#ajaxloader').classList.remove('d-flex')
  return Promise.reject(error)
})

// 요청 인터셉터
loginAxios.interceptors.request.use((configs) => {
  // 요청 전에 로딩 오버레이 띄우기
  document.querySelector('#ajaxloader').classList.add('d-flex')
  return configs
}, (error) => {
  // 에라 나면 로딩 끄기
  document.querySelector('#ajaxloader').classList.remove('d-flex')
  return Promise.reject(error)
})

// 응답 인터셉터
loginAxios.interceptors.response.use((response) => {
  // 응답 받으면 로딩 끄기
  document.querySelector('#ajaxloader').classList.remove('d-flex')
  return response
}, (error) => {
  // 응답 에러 시에도 로딩 끄기
  document.querySelector('#ajaxloader').classList.remove('d-flex')
  return Promise.reject(error)
})

// eslint-disable-next-line consistent-return
const retunData = async (data) => {
  try {
    if (data.data.result === false && data.data.data === 'F') {
      const info = await swal('로그인 필요!', '로그인을 해주세요.', 'info')
      if (info) {
        window.location.href = '/login'
      }
    } else {
      return data
    }
  } catch (err) {
    throw err
  }
}

export { normalAxios, loginAxios, retunData }

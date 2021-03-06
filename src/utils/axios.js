import axios from 'axios'
import store from '../store'
import router from '../router'
import cookies from '@/utils/cookie'
import { Message, Loading } from 'element-ui'
// 根据环境不同引入不同api地址
import { baseApi } from '@/config'
// 创建一个错误
function errorCreate(msg) {
  const error = new Error(msg)
  throw error
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: baseApi
  // timeout: 5000  //请求超时时间
})

// if(process.env.NODE_ENV == 'development') {
if (process.env.NODE_ENV == 'production') {
  service.defaults.baseURL = configUrl
}
// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    // 设置跨域请求头
    config.headers['Access-Control-Allow-Headers'] = '*'
    config.headers['Access-Control-Allow-Methods'] = 'GET,POST,OPTIONS,HEAD,PUT'
    config.headers['Access-Control-Allow-Origin'] = '*'
    config.headers['Access-Control-Allow-Credentials'] = 'true'
    return config
  },
  error => {
    // 发送失败
    console.log(error)
    Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    const code = response.status
    if (code == 200) {
      return dataAxios
    } else if (!code) {
      return dataAxios
    } else {
      switch (code) {
        case 401:
          // 登录失效||重新登录
          Message.error({
            message: '登录超时，请重新登录'
          })
          router.replace('/login')
          break
        default:
          // 其他错误
          Message.error({
            message: dataAxios.msg
          })
          errorCreate(`${dataAxios.msg}: ${response.config.url}`)
          break
      }
      errorCreate(
        `错误抛出[ code: ${code} ] ${dataAxios.msg}: ${response.config.url}`
      )
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          // 登录失效||重新登录
          sessionStorage.removeItem('setLogin')
          sessionStorage.removeItem('userInfo')
          store.dispatch('login/setLogout', false)
          Message.error({
            message: '登录超时，请重新登录'
          })
          router.go(0)
          break
        // error.message = '登录超时，请重新登录'
        // break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          break
      }
    }
    return Promise.reject(error)
  }
)

export default service

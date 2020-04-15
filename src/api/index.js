import ajax from './ajax'
import VueCookies from 'vue-cookies'
 //const BASE_URL = 'http://192.168.33.230:8888'
const BASE_URL = 'https://orgapi.ltby65.com'

export default BASE_URL;
export const $get = (url, params, callback, config) => {
  
  let token1 = {}
  if (VueCookies.get('userInfo')) {
    token1 = VueCookies.get('userInfo').token
  }
  if (config && config.baseUrl) {
    
    ajax(url, params, 'GET', callback)
    return
  }
  ajax(BASE_URL + url, params, 'GET', callback, {
    token: token1
  })
}
export const $post = (url, params, callback, config) => {
  let token2 = {}
  
  if (VueCookies.get('userInfo')) {
     token2 = VueCookies.get('userInfo').token
  }
  if (config && config.baseUrl) {
    ajax(url, params, 'GET', callback)
    return
  }
  ajax(BASE_URL + url, params, 'POST', callback, {
    token: token2
  })
}



import axios from 'axios'
import qs from 'qs' //引入qs模块解决跨域
let _this = this
import {
  Message
} from 'element-ui';

export default function ajax(url = '', params = {}, type = 'GET', callback, headers = '') {
  // console.log(params);
  
  //1.定义promise对象
  let promise;
  return new Promise((resolve, reject) => {
    //2.判断请求的方式
    if ('GET' === type) {
      //2.1 拼接请求字符串
      let paramsStr = '';
      Object.keys(params).forEach(key => {
        paramsStr += key + "=" + params[key] + '&'
      });
      //2.2 过滤最后的&
      if (paramsStr !== '') {
        paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'))
      }
      //2.3 完整路径
      url += '?' + paramsStr; 
      //2.4 发送get请求
      url = url.slice(0,-1)
       promise = axios.get(url, {
         headers: headers
       })
    } else if ('POST' === type) {
      promise = axios.post(url, qs.stringify(params), {
        headers: headers
      })
    }
    // 3.返回请求的结果
    promise.then((res) => {
      if(res.data.code){    //如果是请求后端接口
         if (res.data.code === 200) {
           callback && callback(res.data.data)
         }else if(res.data.code === 403){   //如果token失效

          _this.$router.push('/login')
         }else{
          Message.error(res.data.msg)
         }
      }else{    //如果请求第三方接口
        callback && callback(res.data)
      }
    }).catch((error) => {
      // reject(error) //失败
      console.log(error);
      Message.error('服务器错误')
    })
  })
}
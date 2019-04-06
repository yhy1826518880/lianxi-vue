// 开发Vue插件
import axios from 'axios'
const MyHttpServer = {}
MyHttpServer.install = function (Vue) {
    // 统一配置baseUrl //(接口文档)接口基准地址
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

    // //设置请求头 进行授权
    // const AUTH_TOKEN = localStorage.getItem('token')
    // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN

    
  
    // 4. 添加实例方法
    Vue.prototype.$http = axios
}

export default MyHttpServer
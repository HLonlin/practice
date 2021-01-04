/**
 * api.js
 * 接口文件
 * @author HLonlin <1021944439@qq.com>
 */
const HOSTURL = process.env.NODE_ENV === 'development' ? 'https://openapi.gzslits.com.cn/openapi/' : 'https://openapi.gzslits.com.cn/openapi/';
const API = {
    host: HOSTURL,
    login: '/api/practice/login', // 用户登录 POST
    logout: '/api/practice/logout' // 用户退出 GET
}
export default API
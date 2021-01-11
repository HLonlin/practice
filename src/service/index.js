/**
 * service.js
 * 请求服务配置文件
 * @author HLonlin <1021944439@qq.com>
 */
import axios from 'axios';
import api from "./api.js";
import { Toast } from 'vant';
import tool from '@/assets/tools'; //常用工具集
import Vue from 'vue'

Vue.use(Toast);

const commonFn = {
    stringify: function(obj, sep, eq) { // qs.stringify
        sep = sep || '&';
        eq = eq || '=';
        let str = "";
        for (var k in obj) {
            str += k + eq + unescape(obj[k]) + sep
        }
        return str.slice(0, -1)
    }
}

// axios 配置
axios.defaults.timeout = 15000;
let token = tool.getLocal('token');
if (token) {
    axios.defaults.headers.common["Access-Token"] = token;
}
axios.defaults.baseURL = api.host;

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (config.method === 'post') {
            // config.data = JSON.stringify(config.data);
            config.data = commonFn.stringify(config.data);
        }
        return config;
    },
    err => {
        Toast({
            message: "请求超时!"
        });
        //==================  错误处理  ====================
        return Promise.reject(err);
    })

// http response 拦截器
axios.interceptors.response.use(
    res => {
        // 根据返回的code值来做不同的处理（code含义和后端约定）
        switch (res.code) {
            case '0':
                // code为0的处理
        }
        // 对200和error状态处理
        if (res.status && res.status == 200) {
            switch (res.data.status) {
                case 200:
                    return Promise.resolve(res.data);
                case 400:
                    Toast({
                        message: res.data.message
                    });
                    break;
            }
        }
        return res;
    },
    // 服务器状态码不是200的情况
    // 根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    err => {
        // ================错误处理==================
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = '请求错误(400)';
                    break;
                case 401:
                    err.message = '未授权，请重新登录(401)';
                    break;
                case 403:
                    err.message = '拒绝访问(403)';
                    break;
                case 404:
                    err.message = '请求出错(404)';
                    break;
                case 408:
                    err.message = '请求超时(408)';
                    break;
                case 500:
                    err.message = '服务器错误(500)';
                    break;
                case 501:
                    err.message = '服务未实现(501)';
                    break;
                case 502:
                    err.message = '网络错误(502)';
                    break;
                case 503:
                    err.message = '服务不可用(503)';
                    break;
                case 504:
                    err.message = '网络超时(504)';
                    break;
                case 505:
                    err.message = 'HTTP版本不受支持(505)';
                    break;
                default:
                    err.message = `连接出错(${err.response.status})!`;
            }
        } else {
            err.message = "连接服务器失败!";
        }
        Toast({
            message: err.message
        });
        return Promise.resolve(err);
    }
)

export default axios;
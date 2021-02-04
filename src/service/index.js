/**
 * service.js
 * 请求服务配置文件
 * @author HLonlin <1021944439@qq.com>
 */
import axios from 'axios';
import api from "./api.js";
import { Toast } from 'vant';
import Storage from "@/assets/tools/webstorage";
import router from '../router'
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
axios.defaults.timeout = 30000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = api.host;

// http request 拦截器
axios.interceptors.request.use(
        config => {
            if (config.method === 'post') {
                config.data = commonFn.stringify(config.data);
            }
            if (Storage.getLocal('token') && !(config.url === api.login)) {
                config.headers['Access-Token'] = `${Storage.getLocal('token')}`
            }
            return config;
        },
        err => {
            return Promise.reject(err);
        })
    // http response 拦截器
axios.interceptors.response.use(
    res => {
        let status = res.data.status;
        if (status === 200) {
            return Promise.resolve(res.data);
        } else {
            let errorMsg = res.data.message || '请求失败，请检查网络是否畅通';
            Toast({
                message: errorMsg
            });
            router.replace({
                path: '/login',
            })
        }
        return Promise.reject(res.data);
    },
)

export default axios;
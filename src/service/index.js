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
    });
// http response 拦截器
axios.interceptors.response.use(
    res => {
        let status = res.data.status;
        if (status === 200) {
            return Promise.resolve(res.data);
        } else if (status === 410) {
            let errorMsg = res.data.message || '请求失败，请检查网络是否畅通';
            Toast({
                message: errorMsg
            });
            router.replace({
                path: '/login',
            })
        } else if (status === 400) {
            let errorMsg = res.data.message || '请求失败，请检查网络是否畅通';
            Toast({
                message: errorMsg
            });
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
);
axios.uploadImg = function(file, callback) {
    let files = file.file;
    let that = this;
    let host = "https://practice.dev.qooroo.cn:8443/practice"; // 测试
    // let host='https://practice.gzslits.com.cn/practice'; // 生产
    let uploadUrl = host + "/api/toolkit/upload/file";
    let formdata = new FormData();
    formdata.append(files.name, files, files.name);
    //设置请求头
    let config = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    };
    const axiosAjax = that.create({
        timeout: 1000 * 60 //时间
    });
    axiosAjax
        .post(uploadUrl, formdata, config)
        .then(res => {
            if (callback) {
                callback();
            }
        })
        .catch(() => {});
}

export default axios;
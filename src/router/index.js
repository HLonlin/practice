import Vue from 'vue'
import vueRouter from 'vue-router'
import routes from './routes'

import axios from 'axios';
import api from '../service/api'
import Storage from "@/assets/tools/webstorage";
import { Toast } from 'vant';

Vue.use(vueRouter)
    // 清除路由重复报错
const originalPush = vueRouter.prototype.push
vueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const originalReplace = vueRouter.prototype.replace
vueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}

const Router = new vueRouter({
    // mode: 'history', //后端支持可开
    mode: "hash",
    routes,
    //定义路由切换时页面如何滚动，只在支持 history.pushState 的浏览器中可用
    scrollBehavior: () => ({ y: 0 }),
})

Router.beforeEach((to, from, next) => {
    if (to.query.opentoken) {
        axios.post(api.loginByOpenToken, { opentoken: to.query.opentoken }).then(res => {
            if (res) {
                let userData = res.data;
                let path = '';
                if (JSON.stringify(userData) !== '{}') {
                    Storage.setLocal('userData', userData);
                    Storage.setLocal('token', userData.tokenid);
                }
                if (userData.xibuPermission && userData.banzurenPermission) {
                    path = "/login_choose";
                } else if (userData.xibuPermission) {
                    path = '/sdept';
                } else {
                    path = '/statistics';
                }
                next({
                    path: path,
                    replace: true
                })
            } else {
                Toast({
                    message: '获取用户信息失败',
                })
                next({
                    path: '/login',
                    replace: true
                })
            }
        }).catch(res => {
            next({
                path: '/login',
                replace: true
            })
            let mes = res.message ? res.message : '微信授权失败，请登录！';
            Toast({
                message: mes,
            })
        })
    } else if (to.matched.some(r => r.meta.requireAuth)) {
        if (!Storage.getLocal('userData')) {
            // no userData
            let u = window.navigator.userAgent.toLowerCase();
            if (u.match(/micromessenger/i) == 'micromessenger') {
                console.log(0);
                axios.post(api.getWechatAuthURI, {
                    url: window.location.origin + '/mop/#' + to.fullPath,
                    appcode: 'practice'
                }).then(res => {
                    if (res.status === 200) {
                        location.replace(res.data.authurl)
                    } else {
                        throw res;
                    }
                }).catch(res => {
                    let mes = res.message ? res.message : '微信授权失败，请登录！';
                    Toast({
                        message: mes,
                    })
                    next({
                        path: '/login',
                        replace: true
                    })
                })
            } else {
                next({
                    path: '/login',
                    replace: true
                })
            }
        } else {
            next();
        }
    } else {
        next();
    }
})

export default Router
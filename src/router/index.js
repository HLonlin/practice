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

const u = window.navigator.userAgent.toLowerCase();

Router.beforeEach((to, from, next) => {
    if (to.query.opentoken) {
        if ((u.match(/micromessenger/i) == 'micromessenger') && (u.match(/wxwork/i) == 'wxwork')) {
            // 企业微信、教师端
            axios.post(api.loginByOpenToken, { opentoken: to.query.opentoken }).then(res => {
                if (res) {
                    let path = '';
                    let userData = res.data;
                    Storage.setLocal('token', res.data.tokenid);
                    // 授权登录成功后获取教师补充信息
                    axios.post(api.getuserInfo_teacher).then(res => {
                        userData["isTeacher"] = true;
                        for (let key in res.data) {
                            userData[key] = res.data[key];
                        }
                        userData.tokenid = Storage.getLocal('token');
                        Storage.setLocal('userData', userData);
                        // 根据教师权限跳转路由
                        if (userData.xibuPermission && userData.banzurenPermission) {
                            path = "/login_choose";
                        } else if (userData.xibuPermission) {
                            Storage.setLocal('identity', 'sdept');
                            path = '/sdept';
                        } else {
                            Storage.setLocal('identity', 'statistics');
                            Storage.setLocal('evaluateRemind_teacher', false);
                            path = '/statistics';
                        }
                        next({
                            path: path,
                            replace: true
                        })
                    });
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
            // 微信公众号、学生端
        }
    } else if (to.matched.some(r => r.meta.requireAuth)) {
        // 需要授权的路由、检查是否已有登录token
        if (!Storage.getLocal('token')) {
            // no token 需按环境进行授权或账号密码重新登录
            Storage.removeLocal('token');
            Storage.removeLocal('userData');
            if ((u.match(/micromessenger/i) == 'micromessenger') && (u.match(/wxwork/i) == 'wxwork')) {
                // 企业微信、教师端
                console.log('企业微信、教师端')
                axios.post(api.getWechatAuthURI, {
                        url: window.location.origin + '/mop/#' + to.fullPath,
                        appcode: 'practice'
                    })
                    .then(res => {
                        if (res.status === 200) {
                            location.replace(res.data.authurl)
                        } else {
                            throw res;
                        }
                    })
                    .catch(res => {
                        let mes = res.message ? res.message : '微信授权失败，请登录！';
                        Toast({
                            message: mes,
                        })
                        next({
                            path: '/login',
                            replace: true
                        })
                    })
            } else if (u.match(/micromessenger/i) == 'micromessenger') {
                // 微信公众号、学生端
                console.log('微信公众号、学生端');
                next({
                    path: '/login',
                    replace: true
                })
            } else {
                // 账号密码登录、H5端
                next({
                    path: '/login',
                    replace: true
                })
            }
        } else {
            // has token 检查是否有用户信息
            if ((u.match(/micromessenger/i) == 'micromessenger') && (u.match(/wxwork/i) == 'wxwork')) {
                // 企业微信、教师端
                let userData = Storage.getLocal('userData');
                axios.post(api.getuserInfo_teacher).then(res => {
                    userData["isTeacher"] = true;
                    for (let key in res.data) {
                        userData[key] = res.data[key];
                    }
                    Storage.setLocal('userData', userData);
                    next();
                });
            } else if (u.match(/micromessenger/i) == 'micromessenger') {
                // 微信公众号、学生端
                next();
            } else {
                next();
            }
        }

    } else {
        next();
    }
})

export default Router
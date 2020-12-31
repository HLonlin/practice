import Vue from 'vue';

import '@/assets/styles/icon/iconfont.css' // icon
import '@/assets/styles/default.css'; // 默认样式

// 按需引入vant组件
import 'vant/lib/index.css'
import { Col, Row, Badge, Calendar, DatetimePicker, NavBar, Search, List, PullRefresh, Notify, Field, RadioGroup, Radio, Uploader } from "vant";
const vantComponentsObj = { Col, Row, Badge, Calendar, DatetimePicker, NavBar, Search, List, PullRefresh, Notify, Field, RadioGroup, Radio, Uploader }
const vantComponents = {
    install(Vue) {
        Object.keys(vantComponentsObj).forEach(key => Vue.use(vantComponentsObj[key]))
    }
}
Vue.use(vantComponents);

import tool from '@/assets/tools'; //常用工具集
import axios from '@/service'; // http管理 
import api from '@/service/api'; // api管理
Vue.prototype.$tool = tool;
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;

import App from './App';
import router from './router';
import store from './store'

// 生产环境下不启动提示消息
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
        el: '#app',
        store,
        router,
        components: {
            App
        },
        template: '<App/>'
    })
    // router.beforeEach((to, from, next) => {
    //     if (to.meta.login_require) {
    //         if (store.state.tokenid) {
    //             next()
    //             return;
    //             axios.get(api.roleList, {
    //                 headers: { 'Biz-Access-Token': tokenid }
    //             }).then(res => {
    //                 if (res.status !== 200) {
    //                     next({
    //                         path: '/login',
    //                         replace: true,
    //                         query: {
    //                             redirect: to.path
    //                         }
    //                     })
    //                 }
    //                 next()
    //             })
    //         } else {
    //             next({
    //                 path: '/login',
    //                 replace: true,
    //                 query: {
    //                     redirect: to.path
    //                 }
    //             })
    //         }
    //     } else {
    //         next()
    //     }
    // })
    // router.beforeResolve((to, from, next) => {
    //     if (to.meta.title) {
    //         document.title = to.meta.title
    //     }
    //     next()
    // })
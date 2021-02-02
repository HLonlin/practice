import Vue from 'vue';

import '@/assets/styles/icon/iconfont.css' // icon
import '@/assets/styles/default.css'; // 默认样式

// 按需引入vant组件
import 'vant/lib/index.css'
import { Col, Row, Badge, Calendar, DatetimePicker, NavBar, Search, List, PullRefresh, Notify, Field, RadioGroup, Radio, Uploader, Tabbar, TabbarItem, Toast, Dialog, ImagePreview, Popup, IndexBar, IndexAnchor, Switch, Cell } from "vant";
const vantComponentsObj = { Col, Row, Badge, Calendar, DatetimePicker, NavBar, Search, List, PullRefresh, Notify, Field, RadioGroup, Radio, Uploader, Tabbar, Dialog, TabbarItem, Toast, ImagePreview, Popup, IndexBar, IndexAnchor, Switch, Cell }
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
import Vue from 'vue';

import '@/assets/styles/default.css';

import tool from '@/assets/tools';
import axios from '@/service';
import api from '@/service/api';
import cookies from "js-cookie";
Vue.prototype.$tool = tool;
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
Vue.prototype.$cookies = cookies;

import App from './App';
import router from './router';
import store from './store'

// 按需引入vant组件
import 'vant/lib/index.css'
import { Col, Row } from "vant";
Vue.use(Col);
Vue.use(Row);

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
import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
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
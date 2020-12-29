import Vue from 'vue'
import vueRouter from 'vue-router'
Vue.use(vueRouter)
    // 清除路由重复报错
const originalPush = vueRouter.prototype.push
vueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// 静态路由
export const constantRouter = [{
        path: '',
        component: () =>
            import ('@/views/home'),
        redirect: '/signin',
        children: [{
                path: 'signin',
                component: () =>
                    import ( /*webpackChunkName: '包名',*/ '@/views/pages/signin'),
                hidden: true,
                meta: {
                    title: '签到',
                    login_require: true
                },
            },
            {
                path: 'news',
                component: () =>
                    import ( /*webpackChunkName: '包名',*/ '@/views/pages/news'),
                hidden: true,
                meta: {
                    title: '消息',
                    login_require: true
                },
            },
            {
                path: 'notice',
                component: () =>
                    import ( /*webpackChunkName: '包名',*/ '@/views/pages/notice'),
                hidden: true,
                meta: {
                    title: '公告',
                    login_require: true
                },
            },
            {
                path: 'mine',
                component: () =>
                    import ( /*webpackChunkName: '包名',*/ '@/views/pages/mine'),
                hidden: true,
                meta: {
                    title: '我',
                    login_require: true
                }
            }
        ]
    },
    // 通过es提案的import()实现懒加载，指定相同webpackChunkName的组件会被打包到同一js文件中
    {
        path: '/404',
        component: () =>
            import ( /*webpackChunkName: '包名',*/ '@/views/pages/lose'),
        hidden: true
    },
    {
        path: '/login',
        component: () =>
            import ( /*webpackChunkName: '包名',*/ '@/views/pages/login'),
        hidden: true
    }
]

// 动态路由
export const asyncRouter = []

export default new vueRouter({
    // mode: 'history', //后端支持可开
    routes: constantRouter,
    //定义路由切换时页面如何滚动，只在支持 history.pushState 的浏览器中可用
    scrollBehavior: () => ({ y: 0 }),
})
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
        // 通过es提案的import()实现懒加载，指定相同webpackChunkName的组件会被打包到同一js文件中
        component: () =>
            import ( /*webpackChunkName: '包名',*/ '@/views/home'),
        redirect: '/signin',
        children: [{
                path: 'signin',
                component: () =>
                    import ('@/views/pages/signin'),
                hidden: true,
                meta: {
                    login_require: true,
                },
            },
            {
                path: 'news',
                component: () =>
                    import ('@/views/pages/news'),
                hidden: true,
                meta: {
                    login_require: true,
                },
            },
            {
                path: 'notice',
                component: () =>
                    import ('@/views/pages/notice'),
                hidden: true,
                meta: {
                    login_require: true,
                },
            },
            {
                path: 'mine',
                component: () =>
                    import ('@/views/pages/mine'),
                hidden: true,
                meta: {
                    login_require: true,
                }
            }
        ]
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/pages/lose'),
        hidden: true
    },
    {
        path: '/login',
        component: () =>
            import ('@/views/pages/login'),
        hidden: true
    },
    {
        name: 'detailPage',
        path: '/detailPage',
        component: () =>
            import ('@/views/pages/notice/subpage/detailPages'),
        hidden: true
    },
    {
        name: 'selfinfo',
        path: '/selfinfo',
        component: () =>
            import ('@/views/pages/mine/subpage/selfinfo'),
        hidden: true
    },
    {
        name: 'monthlylist',
        path: '/monthlylist',
        component: () =>
            import ('@/views/pages/mine/subpage/monthlylist'),
        hidden: true
    },
    {
        name: 'monthlydetail',
        path: '/monthlydetail',
        component: () =>
            import ('@/views/pages/mine/subpage/monthlydetail'),
        hidden: true
    },
    {
        name: 'addmonthly',
        path: '/addmonthly',
        component: () =>
            import ('@/views/pages/mine/subpage/addmonthly'),
        hidden: true
    },
    {
        name: 'library',
        path: '/library',
        component: () =>
            import ('@/views/pages/mine/subpage/library'),
        hidden: true
    }


]

// 动态路由
export const asyncRouter = []

export default new vueRouter({
    // mode: 'history', //后端支持可开
    mode: "hash",
    routes: constantRouter,
    //定义路由切换时页面如何滚动，只在支持 history.pushState 的浏览器中可用
    scrollBehavior: () => ({ y: 0 }),
})
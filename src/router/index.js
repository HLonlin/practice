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
            import ('@/views/home/indexLayout'),
        redirect: '/home',
        children: [{
                path: 'home',
                name: 'home',
                component: () =>
                    import ('@/views/home/index'),
                meta: {
                    title: '首页',
                    icon: 'home'
                }
            },
            {
                path: 'mine',
                component: () =>
                    import ( /*webpackChunkName: '包名',*/ '@/views/pages/mine'),
                hidden: true
            },
            {
                path: 'news',
                component: () =>
                    import ( /*webpackChunkName: '包名',*/ '@/views/pages/news'),
                hidden: true
            },
            {
                path: 'notice',
                component: () =>
                    import ( /*webpackChunkName: '包名',*/ '@/views/pages/notice'),
                hidden: true
            },
            {
                path: 'signin',
                component: () =>
                    import ( /*webpackChunkName: '包名',*/ '@/views/pages/signin'),
                hidden: true
            },
        ]
    },
    // 通过es提案的import()实现懒加载，指定相同webpackChunkName的组件会被打包到同一js文件中
    {
        path: '/404',
        component: () =>
            import ( /*webpackChunkName: '包名',*/ '@/views/pages/lose'),
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
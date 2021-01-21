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
                path: 'statistics',
                component: () =>
                    import ('@/views/pages/statistics'),
                hidden: true,
                meta: {
                    title: '统计'
                },
            },
            {
                path: 'signin',
                component: () =>
                    import ('@/views/pages/signin'),
                hidden: true,
                meta: {
                    title: '签到'
                },
            },
            {
                path: 'news',
                component: () =>
                    import ('@/views/pages/news'),
                hidden: true,
                meta: {
                    title: '消息'
                },
            },
            {
                path: 'notice',
                component: () =>
                    import ('@/views/pages/notice'),
                hidden: true,
                meta: {
                    title: '公告'
                },
            },
            {
                path: 'mine',
                component: () =>
                    import ('@/views/pages/mine'),
                hidden: true,
                meta: {
                    title: '我'
                }
            }
        ]
    },
    {
        title: '404',
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
        title: '聊天室',
        name: 'chatroom',
        path: '/chatroom',
        component: () =>
            import ('@/views/pages/news/subpage/chatroom'),
        hidden: true
    },
    {
        title: '聊天记录列表',
        name: 'chatrecordlist',
        path: '/chatrecordlist',
        component: () =>
            import ('@/views/pages/news/subpage/chatrecordlist'),
        hidden: true
    },
    {
        title: '聊天记录',
        name: 'chatrecord',
        path: '/chatrecord',
        component: () =>
            import ('@/views/pages/news/subpage/chatrecord'),
        hidden: true
    },
    {
        title: '常用语',
        name: 'commonwords',
        path: '/commonwords',
        component: () =>
            import ('@/views/pages/news/subpage/commonwords'),
        hidden: true
    },
    {
        title: '新增公告',
        name: 'addnotice',
        path: '/addnotice',
        component: () =>
            import ('@/views/pages/notice/subpage/addnotice'),
        hidden: true
    },
    {
        title: '公告详情',
        name: 'detailPage',
        path: '/detailPage',
        component: () =>
            import ('@/views/pages/notice/subpage/detailPages'),
        hidden: true
    },
    {
        title: '个人信息',
        name: 'selfinfo',
        path: '/selfinfo',
        component: () =>
            import ('@/views/pages/mine/subpage/selfinfo'),
        hidden: true
    },
    {
        title: '待处理名单',
        name: 'todolist',
        path: '/todolist',
        component: () =>
            import ('@/views/pages/mine/subpage/todolist'),
        hidden: true
    },
    {
        title: '班级月记列表',
        name: 'classmonthly',
        path: '/classmonthly',
        component: () =>
            import ('@/views/pages/mine/subpage/classmonthly'),
        hidden: true
    },
    {
        title: '月记列表',
        name: 'monthlylist',
        path: '/monthlylist',
        component: () =>
            import ('@/views/pages/mine/subpage/monthlylist'),
        hidden: true
    },
    {
        title: '月记详情',
        name: 'monthlydetail',
        path: '/monthlydetail',
        component: () =>
            import ('@/views/pages/mine/subpage/monthlydetail'),
        hidden: true
    },
    {
        title: '新增月记',
        name: 'addmonthly',
        path: '/addmonthly',
        component: () =>
            import ('@/views/pages/mine/subpage/addmonthly'),
        hidden: true
    },
    {
        title: '每日一学',
        name: 'dailystudy',
        path: '/dailystudy',
        component: () =>
            import ('@/views/pages/mine/subpage/dailystudy'),
        hidden: true
    },
    {
        title: '教学文档库',
        name: 'library',
        path: '/library',
        component: () =>
            import ('@/views/pages/mine/subpage/library'),
        hidden: true
    },
    {
        title: '我的签到',
        name: 'mySignin',
        path: '/mySignin',
        component: () =>
            import ('@/views/pages/mine/subpage/mySignin'),
        hidden: true
    },
    {
        title: '通讯录',
        name: 'contactList',
        path: '/contactList',
        component: () =>
            import ('@/views/pages/mine/subpage/contactList'),
        hidden: true
    },
    {
        title: '关于',
        name: 'about',
        path: '/about',
        component: () =>
            import ('@/views/pages/mine/subpage/about'),
        hidden: true
    },


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
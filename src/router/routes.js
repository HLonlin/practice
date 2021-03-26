let path = '';
let u = window.navigator.userAgent.toLowerCase();
if ((u.match(/micromessenger/i) == 'micromessenger') && (u.match(/wxwork/i) == 'wxwork')) {
    // 教师端首页为统计列表
    path = '/statistics';
} else if (u.match(/micromessenger/i) == 'micromessenger') {
    // 学生端首页为签到页
    path = '/signin'
} else {
    // h5需先登录
    path = '/login'
}

const routes = [{
        path: '',
        // 通过es提案的import()实现懒加载，指定相同webpackChunkName的组件会被打包到同一js文件中
        component: () =>
            import ( /*webpackChunkName: '包名',*/ '@/views/home'),
        redirect: path,
        meta: { requireAuth: true },
        children: [{
                path: 'statistics',
                component: () =>
                    import ('@/views/pages/statistics'),
                hidden: true,
                meta: {
                    title: '统计',
                    requireAuth: true
                },
            },
            {
                path: 'signin',
                component: () =>
                    import ('@/views/pages/signin'),
                hidden: true,
                meta: {
                    title: '签到',
                    requireAuth: true
                },
            },
            {
                path: 'news',
                component: () =>
                    import ('@/views/pages/news'),
                hidden: true,
                meta: {
                    title: '消息',
                    requireAuth: true
                },
            },
            {
                path: 'notice',
                component: () =>
                    import ('@/views/pages/notice'),
                hidden: true,
                meta: {
                    title: '公告',
                    requireAuth: true
                },
            },
            {
                path: 'mine',
                component: () =>
                    import ('@/views/pages/mine'),
                hidden: true,
                meta: {
                    title: '我',
                    requireAuth: true
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
        hidden: true,
    },
    {
        title: '登录入口',
        path: '/login_choose',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/login/subpage/login_choose'),
        hidden: true,
    },
    {
        title: '每月签到',
        path: '/signinDetail',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/signin/subpage/signinDetail'),
        hidden: true,
    },
    {
        title: '系部列表',
        path: '/sdept',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/sdept'),
        hidden: true
    },
    {
        title: '专业列表',
        path: '/majorList',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/sdept/subpage/majorList'),
        hidden: true
    },
    {
        title: '班级列表',
        path: '/classList',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/sdept/subpage/classList'),
        hidden: true
    },
    {
        title: '学生列表',
        path: '/studentList',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/sdept/subpage/studentList'),
        hidden: true
    },
    {
        title: '学生信息',
        name: 'studentInfo',
        path: '/studentInfo',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/statistics/subpage/studentInfo'),
        hidden: true
    },
    {
        title: '学生操行评定列表',
        name: 'evaluateList',
        path: '/evaluateList',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/statistics/subpage/evaluateList'),
        hidden: true
    },
    {
        title: '学生月度操行评定',
        name: 'evaluateStudent',
        path: '/evaluateStudent',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/statistics/subpage/evaluateStudent'),
        hidden: true
    },
    {
        title: '班主任评价',
        name: 'evaluateTeacher',
        path: '/evaluateTeacher',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/statistics/subpage/evaluateTeacher'),
        hidden: true
    },
    {
        title: '聊天室',
        name: 'chatroom',
        path: '/chatroom',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/news/subpage/chatroom'),
        hidden: true
    },
    {
        title: '聊天记录列表',
        name: 'chatrecordlist',
        path: '/chatrecordlist',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/news/subpage/chatrecordlist'),
        hidden: true
    },
    {
        title: '聊天记录',
        name: 'chatrecord',
        path: '/chatrecord',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/news/subpage/chatrecord'),
        hidden: true
    },
    {
        title: '常用语',
        name: 'commonwords',
        path: '/commonwords',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/news/subpage/commonwords'),
        hidden: true
    },
    {
        title: '新增公告',
        name: 'addnotice',
        path: '/addnotice',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/notice/subpage/addnotice'),
        hidden: true
    },
    {
        title: '公告详情',
        name: 'detailPage',
        path: '/detailPage',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/notice/subpage/detailPages'),
        hidden: true
    },
    {
        title: '报名情况',
        name: 'applylist',
        path: '/applylist',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/notice/subpage/applylist'),
        hidden: true
    },
    {
        title: '审核学生信息',
        name: 'auditstudent',
        path: '/auditstudent',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/mine/subpage/auditstudent'),
        hidden: true
    },
    {
        title: '个人信息',
        name: 'selfinfo',
        path: '/selfinfo',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/mine/subpage/selfinfo'),
        hidden: true
    },
    {
        title: '待处理名单',
        name: 'todolist',
        path: '/todolist',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/mine/subpage/todolist'),
        hidden: true
    },
    {
        title: '班级月记列表',
        name: 'classmonthly',
        path: '/classmonthly',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/mine/subpage/classmonthly'),
        hidden: true
    },
    {
        title: '月记列表',
        name: 'monthlylist',
        path: '/monthlylist',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/mine/subpage/monthlylist'),
        hidden: true
    },
    {
        title: '月记详情',
        name: 'monthlydetail',
        path: '/monthlydetail',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/mine/subpage/monthlydetail'),
        hidden: true
    },
    {
        title: '新增月记',
        name: 'addmonthly',
        path: '/addmonthly',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/mine/subpage/addmonthly'),
        hidden: true
    },
    {
        title: '修改记录',
        name: 'updaterecord',
        path: '/updaterecord',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/mine/subpage/updaterecord'),
        hidden: true
    },
    {
        title: '记录详情',
        name: 'recorddetail',
        path: '/recorddetail',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/mine/subpage/recorddetail'),
        hidden: true
    },
    {
        title: '每日一学',
        name: 'dailystudy',
        path: '/dailystudy',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/mine/subpage/dailystudy'),
        hidden: true
    },
    {
        title: '教学文档库',
        name: 'library',
        path: '/library',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/mine/subpage/library'),
        hidden: true
    },
    {
        title: '我的签到',
        name: 'mySignin',
        path: '/mySignin',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/mine/subpage/mySignin'),
        hidden: true
    },
    {
        title: '通讯录',
        name: 'contactList',
        path: '/contactList',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/mine/subpage/contactList'),
        hidden: true
    },
    {
        title: '关于',
        name: 'about',
        path: '/about',
        meta: { requireAuth: true },
        component: () =>
            import ('@/views/pages/mine/subpage/about'),
        hidden: true
    },
]
export default routes
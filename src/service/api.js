/**
 * api.js
 * 接口文件
 * @author HLonlin <1021944439@qq.com>
 */
const HOSTURL = process.env.NODE_ENV === 'development' ? 'https://openapi.gzslits.com.cn/openapi/' : 'https://openapi.gzslits.com.cn/openapi/';
const API = {
    host: HOSTURL,
    login: '/api/practice/login', // 用户登录 POST
    logout: '/api/practice/logout', // 用户退出 GET
    getWechatInvokesign: '', // 获取微信调用配置
    getLearnEveryDay: '/api/practice/student/meizhouyixue/context', // 获取每日一学内容
    recordLearnEveryDay: '/api/practice/student/meizhouyixue/record', // 每日一学学习记录打卡
    isLearnToday: '/api/practice/student/meizhouyixue/hasMeizhouyixue', // 判断是否已经学习每日一学
    isSignin: '/api/practice/student/qiandao/hasQiandao', // 判断今天是否签到
    signinList: '/api/practice/student/qiandao/monthQiandaoList', // 根据月份获取学员签到列表
    signin: '/api/practice/student/qiandao/signIn', // 学员签到
    getSigninDetails: '/api/practice/student/qiandao/dateQiandao', // 根据日期查看签到详情
    noticeList: '/api/practice/student/notice/noticeList', // 分页条件查询公告列表
    noticeDetail: '/api/practice/student/notice/noticeDetail', // 公告详情
    readNotice: '/api/practice/student/notice/readNotice', // 阅读公告（设置为已读）
    updateInfo_student: '/api/practice/student/profile/updateProfile', // 修改学生个人信息
    healthStatus: '/api/practice/dic/healthStatus', // 健康状态数据字典
    jiuyefangshi: '/api/practice/dic/jiuyefangshi', //就业方式数据字典
    jiuyezhuangtai: '/api/practice/dic/jiuyezhuangtai', // 就业状态数据字典
}
export default API
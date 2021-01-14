/**
 * api.js
 * 接口文件
 * @author HLonlin <1021944439@qq.com>
 */
const HOSTURL = process.env.NODE_ENV === 'development' ? 'https://openapi.gzslits.com.cn/openapi/' : 'https://openapi.gzslits.com.cn/openapi/';
const API = {
    host: HOSTURL,
    // ------------------------登录---------------------------------
    login: '/api/practice/login', // 用户登录 POST
    logout: '/api/practice/logout', // 用户退出 GET
    // ------------------------签到--------------------------------
    signin: '/api/practice/student/qiandao/signIn', // 学员签到
    isSignin: '/api/practice/student/qiandao/hasQiandao', // 判断今天是否签到
    signinList: '/api/practice/student/qiandao/monthQiandaoList', // 根据月份获取学员签到列表
    getSigninDetails: '/api/practice/student/qiandao/dateQiandao', // 根据日期查看签到详情
    healthStatus: '/api/practice/dic/healthStatus', // 健康状态数据字典
    getWechatInvokesign: '', // 获取微信调用配置
    getDailyStudy: '/api/practice/student/meizhouyixue/context', // 获取每日一学内容
    recordLearnEveryDay: '/api/practice/student/meizhouyixue/record', // 每日一学学习记录打卡
    isLearnToday: '/api/practice/student/meizhouyixue/hasMeizhouyixue', // 判断是否已经学习每日一学
    getDailyStudyByDate: '/api/practice/student/meizhouyixue/dateYixue', // 根据日期获取每日一学内容
    // ------------------------消息---------------------------------
    msgList: '/api/practice/student/xiaoxi/xiaoxiList', // 消息列表
    msgDetail: '/api/practice/student/xiaoxi/xiaoxiDetail', // 消息详情
    readMsg: '/openapi/api/practice/student/xiaoxi/markRead', // 标记消息为已读
    sendMsg_student: '/api/practice/student/xiaoxi/sendXiaoxi', // 学生发送消息
    sendMsg_teacher: '/api/practice/teacher/xiaoxi/sendXiaoxi', // 老师发送消息
    searchMsg: '/api/practice/student/xiaoxi/historyList', // 条件查询历史消息列表
    historyMsgDetailList: ' /api/practice/student/xiaoxi/historyDetailList', // 分页条件查询历史消息详情列表
    // ------------------------公告---------------------------------
    noticeList: '/api/practice/student/notice/noticeList', // 分页条件查询公告列表
    noticeDetail: '/api/practice/student/notice/noticeDetail', // 公告详情
    readNotice: '/api/practice/student/notice/readNotice', // 阅读公告（设置为已读）
    // ----------------------个人信息--------------------------------
    updateInfo_student: '/api/practice/student/profile/updateProfile', // 修改学生个人信息
    jiuyefangshi: '/api/practice/dic/jiuyefangshi', //就业方式数据字典
    jiuyezhuangtai: '/api/practice/dic/jiuyezhuangtai', // 就业状态数据字典
    // ------------------------月记----------------------------------
    monthlyList: '/api/practice/student/zhoubao/zhoubaoList', // 月记列表
    monthlyDetail: '/api/practice/student/zhoubao/zhoubaoDetail', // 月记详情
    addMonthly: '/api/practice/student/zhoubao/zhoubaoAdd', // 添加月记
    contactList: '/api/practice/student/contact/contactList', // 通讯录
    contactDetail: '/api/practice/student/contact/contactDetail', // 通讯录用户详情
    about: '/api/practice/dic/guanyu', // 移动端关于菜单配置

}
export default API
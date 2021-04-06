/**
 * api.js
 * 接口文件
 * @author HLonlin <1021944439@qq.com>
 */
// const HOSTURL = process.env.NODE_ENV === 'development' ? 'https://openapi.dev.qooroo.cn:8443/openapi/' : 'https://openapi.gzslits.com.cn/openapi/';
const HOSTURL = process.env.API_ROOT;
const API = {
    host: HOSTURL,
    // --------------------------登录--------------------------
    getWechatAuthURI: '/api/practice/workwechat/getWechatAuthURI', // 获取企业微信授权的URL地址
    redirect: '/api/practice/workwechat/redirect', // 企业微信重定向
    loginByOpenToken: '/api/practice/workwechat/loginByOpenToken', // 通过企业微信opentoken登录
    getWechatAuthURI_wechat: '/api/practice/wechat/getWechatAuthURI', // 获取微信公众号授权的URL地址
    redirect_wechat: '/api/practice/wechat/redirect', // 微信公众号重定向
    loginByOpenToken_wechat: '/api/practice/wechat/loginByOpenToken', // 根据opentoken微信登录
    login: '/api/practice/login', // 用户登录
    logout: '/api/practice/logout', // 用户退出
    // --------------------------------------------------------------- 学生端 ---------------------------------------------------------------
    // --------------------------签到--------------------------
    getLastQianDaoMonth_student: '/api/practice/student/tongji/getLastQianDaoMonth', // 获取最后一次签到月份
    signin: '/api/practice/student/qiandao/signIn', // 学员签到
    isSignin: '/api/practice/student/qiandao/hasQiandao', // 判断今天是否签到
    signinList: '/api/practice/student/qiandao/monthQiandaoList', // 根据月份获取学员签到列表
    getSigninDetails: '/api/practice/student/qiandao/dateQiandao', // 根据日期查看签到详情
    healthStatus: '/api/practice/dic/healthStatus', // 健康状态数据字典
    getDailyStudy: '/api/practice/student/meizhouyixue/context', // 获取每日一学内容
    recordLearnEveryDay: '/api/practice/student/meizhouyixue/record', // 每日一学学习记录打卡
    isLearnToday: '/api/practice/student/meizhouyixue/hasMeizhouyixue', // 判断是否已经学习每日一学
    getDailyStudyByDate: '/api/practice/student/meizhouyixue/dateYixue', // 根据日期获取每日一学内容
    getUserByCardId: '/api/practice/student/getUserByCardId', // 根据身份证查找学生信息
    getUpdateUserInfoMsg: '/api/practice/student/getUpdateUserInfoMsg', // 获取学员修改个人信息提示语
    getUserInfo: '/api/practice/student/getUserInfo', // 获取学生基本信息
    mobileImage: '/api/practice/mobileimage', // 移动端背景图
    // --------------------------消息--------------------------
    msgList: '/api/practice/student/xiaoxi/xiaoxiList', // 消息列表
    msgDetail: '/api/practice/student/xiaoxi/xiaoxiDetail', // 消息详情
    readMsg: '/api/practice/student/xiaoxi/markRead', // 标记消息为已读
    sendMsg_student: '/api/practice/student/xiaoxi/sendXiaoxi', // 学生发送消息
    historyMsgList: '/api/practice/student/xiaoxi/historyList', // 历史消息列表
    historyMsgDetailList: '/api/practice/student/xiaoxi/historyDetailList', // 历史消息详情列表
    remarkList: '/api/practice/student/xiaoxi/remarkList', // 学员常用语列表
    remarkAdd: '/api/practice/student/xiaoxi/remarkAdd', // 添加学员常用语
    remarkEdit: '/api/practice/student/xiaoxi/remarkEdit', // 修改学员常用语
    remarkDelete: '/api/practice/student/xiaoxi/remarkDelete', // 删除学员常用语
    findUserByUserId: '/api/practice/student/findUserByUserId', // 查询老师信息
    // --------------------------公告--------------------------
    noticeList: '/api/practice/student/notice/noticeList', // 公告列表
    adList: '/api/practice/student/notice/recruitNoticeList', // 公告列表
    noticeDetail: '/api/practice/student/notice/noticeDetail', // 公告详情
    readNotice: '/api/practice/student/notice/readNotice', // 阅读公告（设置为已读）
    recruitApply: '/api/practice/student/job/recruitApply', // 学生企业报名
    hasRecruitApply: '/api/practice/student/job/hasRecruitApply', // 是否已报名企业
    // --------------------------我的--------------------------
    updateInfo_student: '/api/practice/student/profile/updateProfile', // 修改学生个人信息
    jiuyefangshi: '/api/practice/dic/jiuyefangshi', //就业方式数据字典
    jiuyezhuangtai: '/api/practice/dic/jiuyezhuangtai', // 就业状态数据字典
    isUpdateStudentRecord: '/api/practice/student/isUpdateStudentRecord', // 查询是否存在未审核学生修改记录
    getBanZhuRenPingJiaMsg: '/api/practice/student/getBanZhuRenPingJiaMsg', // 获取班主任评价提示信息
    addBanZhuRenPingJia: '/api/practice/student/banzhuren/addBanZhuRenPingJia', // 新增班主任评价
    banZhuRenPingJiaList_student: '/api/practice/student/banZhuRenPingJiaList', // 班主任评价列表
    findBanZhuRenPingJiaById_student: '/api/practice/student/findBanZhuRenPingJiaById', // 查询班主任评价详情
    recordList: '/api/practice/student/recordList', // 学生修改信息历史记录列表
    // --------------------------月记--------------------------
    monthlyList: '/api/practice/student/zhoubao/zhoubaoList', // 月记列表
    monthlyDetail: '/api/practice/student/zhoubao/zhoubaoDetail', // 月记详情
    addMonthly: '/api/practice/student/zhoubao/zhoubaoAdd', // 添加月记
    contactList: '/api/practice/student/contact/contactList', // 通讯录
    contactDetail: '/api/practice/student/contact/contactDetail', // 通讯录用户详情
    about: '/api/practice/dic/guanyu', // 移动端关于菜单配置
    // --------------------------------------------------------------- 系部端 ---------------------------------------------------------------
    getLastQianDaoMonth_dept: '/api/practice/dept/tongji/getLastQianDaoMonth', // 获取最后一次签到月份
    allCountXibu: '/api/practice/dept/allCountXibu', // 统计所有系部实习率及签到率
    countXibu: '/api/practice/dept/countXibu', // 根据系部统计实习率及签到率
    countZhuanye: '/api/practice/dept/countZhuanye', // 根据专业统计实习率及签到率
    getUserListByBanji: '/api/practice/dept/getUserListByBanji', // 根据班级统计学生信息
    getUserByCardId_dept: '/api/practice/dept/getUserByCardId', // 根据身份证查找学生信息
    getYueJiByCardId: '/api/practice/dept/getYueJiByCardId', // 根据学生身份证查询月记列表
    getYueJiDetailById: '/api/practice/dept/getYueJiDetailById', // 根据月记id查询详情
    yuejiIdeaList: '/api/practice/dept/yuejiIdeaList', // 月记评语列表
    monthQiandaoList: '/api/practice/dept/monthQiandaoList', // 学生每月签到列表
    getUserListByName: '/api/practice/dept/getUserListByName', // 根据学生姓名获取学生列表
    getUserByCardId_dept: '/api/practice/dept/getUserByCardId', // 根据身份证查找学生信息
    monthQiandaoList_dept: '/api/practice/dept/monthQiandaoList', // 系部端学生每月签到列表
    getXuejieList: '/api/practice/dept/getXuejieList', // 获取学届列表
    // --------------------------------------------------------------- 教师端 ---------------------------------------------------------------
    // --------------------------统计--------------------------
    tongjiList: '/api/practice/teacher/tongji/tongjiList', // 教师端统计列表
    zhoubaoideaAdd: '/api/practice/teacher/tongji/zhoubaoideaAdd', // 教师端增加月记点评
    monthQiandaoList_teacher: '/api/practice/teacher/tongji/monthQiandaoList', // 教师端学生每月签到列表
    getConductEvaluationMsg: '/api/practice/teacher/getConductEvaluationMsg', // 获取月度操行评定提示信息
    getEvaluateList: '/api/practice/teacher/conductEvaluationList', // 学生月度操行评定列表
    addConductEvaluation: '/api/practice/teacher/addConductEvaluation', // 新增学生月度操行评定
    getEvaluate: '/api/practice/teacher/getConductEvaluationDetails', // 查看学生月度操行评定详情
    banZhuRenPingJiaList_teacher: '/api/practice/teacher/banZhuRenPingJiaList', //    班主任评价列表
    findBanZhuRenPingJiaById_teacher: '/api/practice/teacher/findBanZhuRenPingJiaById', // 查询班主任评价详情
    studentEdit: '/api/practice/teacher/tongji/studentEdit', // 教师端编辑学生信息
    getLastQianDaoMonth_teacher: '/api/practice/teacher/tongji/getLastQianDaoMonth', // 获取最后一次签到月份
    // --------------------------消息--------------------------
    msgList_teacher: '/api/practice/teacher/xiaoxi/xiaoxiList', // 教师消息列表
    sendMsg_teacher: '/api/practice/teacher/xiaoxi/sendXiaoxi', // 教师发送消息
    msgDetail_teacher: '/api/practice/teacher/xiaoxi/xiaoxiDetail', //教师消息详情
    historyMsgList_teacher: '/api/practice/teacher/xiaoxi/historyList', // 历史消息列表
    historyMsgDetailList_teacher: '/api/practice/teacher/xiaoxi/historyDetailList', // 历史消息详情列表
    remarkList_teacher: '/api/practice/teacher/xiaoxi/remarkList', // 教师常用语列表
    remarkAdd_teacher: '/api/practice/teacher/xiaoxi/remarkAdd', // 添加教师常用语
    remarkEdit_teacher: '/api/practice/teacher/xiaoxi/remarkEdit', // 修改教师常用语
    remarkDelete_teacher: '/api/practice/teacher/xiaoxi/remarkDelete', // 删除教师常用语
    // --------------------------公告--------------------------
    noticeList_teacher: '/api/practice/teacher/notice/noticelist', //公告列表
    adList_teacher: '/api/practice/teacher/notice/recruitNoticeList', //招聘公告
    noticeDetail_teacher: '/api/practice/teacher/notice/noticeDetail', // 公告详情
    readNotice_teacher: '/api/practice/teacher/notice/readNotice', // 阅读公告（设置为已读）
    addNotice: '/api/practice/teacher/notice/addNotice', // 新增公告
    classMonthList_teacher: '/api/practice/teacher/getYueJiList', // 班级月记列表
    monthList_teacher: '/api/practice/teacher/tongji/zhoubaoList', // 教师端学生月记列表
    monthlyDetail_teacher: '/api/practice/teacher/tongji/zhoubaoDetail', // 教师端学生月记详情
    recruitApplyList: '/api/practice/teacher/job/recruitApplyList', // 学生企业报名列表

    // --------------------------我的--------------------------
    getuserInfo_teacher: '/api/practice/teacher/getUserInfo', // 获取教师个人信息
    contactList_teacher: '/api/practice/teacher/getContactsList', // 获取通讯录列表
    auditList: '/api/practice/teacher/auditList', // 待审核名单
    noContactList: '/api/practice/teacher/noContactList', // 未联系名单
    absenteeismList: '/api/practice/teacher/absenteeismList', // 缺勤名单
    auditDetails: '/api/practice/teacher/auditDetails', // 待审核信息详情
    submitAudit: '/api/practice/teacher/submitAudit', // 审核学生信息
    getUserByCardId_teacher: '/api/practice/teacher/getUserByCardId', // 根据身份证查找学生信息
    getCountNum: '/api/practice/teacher/getCountNum', // 获取我的统计数
    zhoubaoRemarkList: '/api/practice/teacher/zhoubao/remarkList', // 教师月记点评常用语列表
    zhoubaoRemarkAdd: '/api/practice/teacher/zhoubao/remarkAdd', // 教师添加月记点评常用语
    zhoubaoRemarkEdit: '/api/practice/teacher/zhoubao/remarkEdit', // 教师修改月记点评常用语
    zhoubaoRemarkDelete: '/api/practice/teacher/zhoubao/remarkDelete', // 教师删除月记点评常用语

    // --------------------------------------------------------------- 微信端 ---------------------------------------------------------------
    bindCardid: '/api/practice/wechat/bindCardid', // 学生微信公众号绑定身份证
    getWechatInvokeSign: '/api/practice/wechat/getWechatInvokeSign', // 获取微信调用配置
    getWorkWechatInvokeSign: '/api/practice/workwechat/getWorkWechatInvokeSign', // 获取企业微信jsapi签名配置信息
    getWorkWechatGlobalSign: '/api/practice/workwechat/getWorkWechatGlobalSign', // 获取企业微信全局jsapi签名配置信息
    getAddress: '/api/practice/wechat/getLocationInfo', // 逆地址解析（坐标位置描述)
    getLocation: '/api/practice/wechat/getLocationCoordinate', // 地址解析（地址转坐标）
    sendvcode: '/api/practice/sendvcode', // 发送验证码

}
export default API
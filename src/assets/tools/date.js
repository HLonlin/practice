/**
 * Date.js
 * 常用日期函数、
 * @author HLonlin <1021944439@qq.com>
 */
const date = {
    /**
     * 获取num天前/后的毫秒级时间戳 num为正可以获得未来的时间，num为负可以获得过去时间
     * @param {number} num - num为正可以获得未来的时间，num为负可以获得过去时间
     */
    getCurrentTime: function(num) {
        let Dater = new Date();
        var num = arguments[0] ? arguments[0] : 0;
        return Dater.getTime() + num * 24 * 60 * 60 * 1000;
    },
    /**
     * 根据传入的date获取日期 默认获取当前日期
     * @param {string} split - 连接符 默认以“/”字符连接
     */
    getDateStr: function(Dater, split) {
        var Dater = arguments[0] ? arguments[0] : new Date();
        var split = arguments[1] ? arguments[1] : '/';
        let monthStr = Dater.getMonth() + 1 < 10 ? '0' + (Dater.getMonth() + 1) : Dater.getMonth() + 1;
        let dates = Dater.getDate() < 10 ? '0' + Dater.getDate() : Dater.getDate();
        let dateStr = Dater.getFullYear() + split + monthStr + split + dates;
        return dateStr;
    },
    /**
     * 根据unit获取当前时间戳 h截止时、m截止分、s截止秒、ms截止毫秒
     * @param {string} unit - 规定返回单位的级别
     */
    getTimeStamp: function(unit) {
        let Dater = new Date();
        switch (unit) {
            case 'h':
                return new Date(Dater.getFullYear() + '/' + Dater.getMonth() + '/' + Dater.getDate() + ' ' + Dater.getHours() +
                    ':00').getTime() / 1000;
                break;
            case 'm':
                return new Date(Dater.getFullYear() + '/' + Dater.getMonth() + '/' + Dater.getDate() + ' ' + Dater.getHours() +
                    ':' + Dater.getMinutes()).getTime() / 1000;
                break;
            case 's':
                return Math.round(Dater / 1000);
                break;
            case 'ms':
                return Dater.getTime();
                break;
            default:
                return Dater.getTime();
        }
    },
    // 获取某年某月天数
    getDaysBy: function(yearMonth) {
        var yearMonth = arguments[0] ? arguments[0] : this.getDateStr(new Date(), '-');
        let arr = yearMonth.split("-");
        let d = new Date(arr[0], arr[1], 0);
        return d.getDate();
    },
    // 获取年月日时分秒
    getFullDate: function() {
        let date = arguments[0] ? new Date(arguments[0]) : new Date();
        let year = date.getFullYear(),
            month =
            date.getMonth() + 1 < 10 ?
            "0" + (date.getMonth() + 1) :
            date.getMonth() + 1,
            day =
            date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
            hour =
            date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
            minute =
            date.getMinutes() < 10 ?
            "0" + date.getMinutes() :
            date.getMinutes(),
            second =
            date.getSeconds() < 10 ?
            "0" + date.getSeconds() :
            date.getSeconds();
        if (arguments[1]) {
            return year + arguments[1] + month + arguments[1] + day + ' ' + hour + ':' + minute + ':' + second;
        } else {
            return year + '年' + month + '月' + day + '日 ' + hour + ':' + minute + ':' + second;
        }
    },
    // 获取年月日
    getYearMonthDate: function() {
        let date = arguments[0] ? new Date(arguments[0]) : new Date();
        let year = date.getFullYear(),
            month =
            date.getMonth() + 1 < 10 ?
            "0" + (date.getMonth() + 1) :
            date.getMonth() + 1,
            day =
            date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        if (arguments[1]) {
            return year + arguments[1] + month + arguments[1] + day
        } else {
            return year + '年' + month + '月' + day + '日'
        }
    }
}
export default date;
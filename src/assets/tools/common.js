/**
 * common.js
 * 常用函数、
 * @author HLonlin <1021944439@qq.com>
 */
const common = {
    // 节流throttle代码：
    // 实现方式： 每次触发事件时， 如果当前有等待执行的延时函数， 则直接return
    throttle: function(fn, delay) {
        let canRun = true; // 通过闭包保存一个标记
        return function() {
            // 在函数开头判断标记是否为true，不为true则return
            if (!canRun) return;
            // 立即设置为false
            canRun = false;
            // 将外部传入的函数的执行放在setTimeout中
            setTimeout(() => {
                // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。
                // 当定时器没有执行的时候标记永远是false，在开头被return掉
                fn.apply(this, arguments);
                canRun = true;
            }, delay);
        };
    },
    // 防抖debounce代码：
    // 实现方式：每次触发事件时设置一个延迟调用方法，并且取消之前的延时调用方法
    // 缺点：如果事件在规定的时间间隔内被不断的触发，则调用方法会被不断的延迟
    debounce: function(fn, delay) {
        var timeout = null; // 创建一个标记用来存放定时器的返回值
        return function(e) {
            // 每当用户输入的时候把前一个 setTimeout clear 掉
            clearTimeout(timeout);
            // 然后又创建一个新的 setTimeout, 这样就能保证interval 间隔内如果时间持续触发，就不会执行 fn 函数
            timeout = setTimeout(() => {
                fn.apply(this, arguments);
            }, delay);
        };
    },
    getGPS_status: function() {
        let that = this;
        navigator.geolocation.getCurrentPosition(function(position) {
            return true;
        }, function(err) {
            return false;
        }, {
            enableHighAcuracy: false, //位置是否精确获取
            timeout: 5000, //获取位置允许的最长时间
            maximumAge: 1000 //多久更新获取一次位置
        });
    }
};
export default common;
//采用prototype原型实现方式，查找元素在数组中的索引值
Array.prototype.getArrayIndex = function(obj) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === obj) {
            return i;
        }
    }
    return -1;
};
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
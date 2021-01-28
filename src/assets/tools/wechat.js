/**
 * wechat.js
 * 微信操作函数、
 * @author HLonlin <1021944439@qq.com>
 */
import wx from "weixin-js-sdk";
import axios from '@/service'; // http管理
import api from '@/service/api'; // api管理
const wechat = {
    //判断是否在微信中  
    userAgent: window.navigator.userAgent,
    isAndroid: window.navigator.userAgent.indexOf("Android") > -1 || window.navigator.userAgent.indexOf("Linux") > -1,
    isIOS: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    isWechat: function() {
        let u = this.userAgent.toLowerCase();
        if (u.match(/micromessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
    //初始化sdk配置  
    initJssdk: function(callback) {
        if (!this.isWechat()) return;
        let url = location.href.split('#')[0];
        //服务端进行签名
        axios.post(api.getWechatInvokeSign, { url: url }).then(res => {
            if (res.data) {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.appId, // 必填，公众号的唯一标识
                    timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                    signature: res.data.signature, // 必填，签名
                    jsApiList: ["getLocation", "openLocation"] // 必填，需要使用的JS接口列表
                });
                wx.ready(function() {
                    //配置完成后，再执行微信功能  
                    if (callback) {
                        callback(res.data);
                    }
                })
            }
        })
    },
    getCurrentAddress: function(callback) {
        this.initJssdk(function() {
            wx.getLocation({
                type: "gcj02", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                altitude: false, // 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
                isHighAccuracy: false, // 开启高精度定位
                success: function(res) {
                    // 回调属性	                 类型	     说明	        
                    // latitude	                number	    纬度，范围为 -90~90，负数表示南纬	
                    // longitude	            number	    经度，范围为 -180~180，负数表示西经	
                    // speed	                number	    速度，单位 m/s	
                    // accuracy	                number	    位置的精确度	
                    // altitude	                number	    高度，单位 m	
                    // verticalAccuracy	        number	    垂直精度，单位 m（Android 无法获取，返回 0）
                    // horizontalAccuracy	    number	    水平精度，单位 m
                    if (callback) {
                        callback(res);
                    }
                },
            })
        })
    },
    openMap: function(lat, lng, data) {
        this.initJssdk(function(res) {
            wx.openLocation({
                latitude: lat, //                       纬度，范围为-90~90，负数表示南纬。使用 gcj02 国测局坐标系
                longitude: lng, //                      经度，范围为-180~180，负数表示西经。使用 gcj02 国测局坐标系
                scale: 18, //                           缩放比例，范围5~18 默认为18
                name: data.name, //                     位置名
                address: data.address, //               地址详细说明
                success: function(res) {
                    if (callback) {
                        callback(res);
                    }
                },
                fail: function() {
                    if (fail) {
                        fail();
                    }
                }
            })
        })
    },
    // 坐标转地址
    locationToAddress: function(latitude, longitude, callback) {
        axios.post(api.getAddress, { location: latitude + ',' + longitude }).then(res => {
            if (callback) {
                callback(res);
            }
        });
    },
    // 地址转坐标
    addressToLocation: function(address, callback) {
        axios.post(api.getLocation, { address: address }).then(res => {
            if (callback) {
                callback(res);
            }
        });
    },

}
export default wechat;
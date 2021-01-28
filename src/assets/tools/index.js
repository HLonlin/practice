/**
 * 常用Fn工具集、
 * @author HLonlin <1021944439@qq.com>
 */
import Storage from "@/assets/tools/webstorage";
import arr from '@/assets/tools/arr.js';
import date from '@/assets/tools/date.js';
import img from '@/assets/tools/image.js';
import math from '@/assets/tools/math.js';
import string from '@/assets/tools/string.js';
import common from '@/assets/tools/common.js';
import pinying from '@/assets/tools/pinying.js';
import wechat from '@/assets/tools/wechat.js';

const tools = {};

Object.assign(tools, Storage, arr, date, img, math, string, common, pinying, wechat);
export default tools;
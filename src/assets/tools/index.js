/**
 * 常用Fn工具集、
 * @author HLonlin <1021944439@qq.com>
 */
import arr from '@/assets/tools/arr.js';
import date from '@/assets/tools/date.js';
import img from '@/assets/tools/image.js';
import math from '@/assets/tools/math.js';
import string from '@/assets/tools/string.js';
import common from '@/assets/tools/common.js';
import pinying from '@/assets/tools/pinying.js';

import { localStorage } from "@/assets/tools/webstorage";
const tools = {};

Object.assign(tools, arr, date, img, math, string, common, pinying, localStorage);
export default tools;
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"', // 开发环境
    API_ROOT: '"https://openapi.dev.qooroo.cn:8443/openapi/"',
})
'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.test.conf')

const spinner = ora('building for testing...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err
    webpack(webpackConfig, (err, stats) => {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        if (stats.hasErrors()) {
            console.log(chalk.red('  构建失败err:\n'))
            process.exit(1)
        }

        console.log(chalk.cyan('  构建完成\n'))
            // console.log(chalk.yellow(
            //   '  Tip: built files are meant to be served over an HTTP server.\n' +
            //   '  Opening index.html over file:// won\'t work.\n'
            // ))
    })
})
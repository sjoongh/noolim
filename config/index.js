'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: 'ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com', // can be overwritten by process.env.HOST
    port: 8082, 
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, 

    // 빌드시 eslint 사용
    useEslint: true,
    // eslint에러를 브라우저에서 확인할 것인지 여부
    showEslintErrorsInOverlay: false,

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // 디버깅시 문제가 발생하면 vue-files안의 devtools에서 감지
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',


    productionSourceMap: true,
    devtool: '#source-map',

    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // npm build시 관련 report생성
    bundleAnalyzerReport: process.env.npm_config_report
  }
}

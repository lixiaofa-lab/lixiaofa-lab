'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 7999,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // '/assess':{
      //    target:'http://192.168.8.209:7756',//xy
      //   //target:'http://192.168.4.220:8856',//xy
      //   // target:'http://192.168.4.220:7765',//yxy
      //   // target:'http://192.168.4.220:8856',//xy
      //   // target:'http://192.168.2.107:7755',//本机虚拟机
      //   changeOrigin:true
      // },
      //

      //南部大数据接口代理
      '/southdefend':{
        target:'http://192.168.4.186:9010',//cyf
        changeOrigin:true,
        pathRewrite: {
          '^\/southdefend': ''
        }
      },

      '/assess/cal':{
        // target:'http://192.168.8.209:7756',//yjy
        target:'http://192.168.4.246:7756',//xy
        // target:'http://192.168.4.220:7756',//xy
        // target:'http://192.168.4.220:7765',//yxy
        // target:'http://192.168.4.220:8856',//xy
        // target:'http://192.168.2.107:7755',//本机虚拟机
        changeOrigin:true
      },
      // '/assess/cal':{
      //   target:'http://192.168.4.220:7756',//xy
      //
      //   // target:'http://192.168.4.246:7756',//xy
      //   // target:'http://192.168.4.220:7765',//yxy
      //
      //   // target:'http://192.168.2.107:7755',//本机虚拟机
      //   changeOrigin:true
      // },
      //  '/43':{
      //   target:'http://yapi.zdpx.com/mock',//xy
      //   changeOrigin:true
      // },
      '/release': {
        // target: 'http://192.168.4.126:8089',//xy
        target: 'http://192.168.4.184:8089',//xy
        changeOrigin: true
      },
      '/44':{
        // target:'http://192.168.8.209:9005',//xy
        target:'http://192.168.4.163:8097',//xy
        // target:'http://192.168.3.3:9006',//xy
        changeOrigin:true,
        pathRewrite: {
          '^\/44': ''
        }
      },
      '/9527':{
        // target:'http://192.168.8.209:9005',//xy
        target:'http://192.168.4.186:8080',//xy
        // target:'http://192.168.3.3:9006',//xy
        changeOrigin:true,
        pathRewrite: {
          '^\/9527': ''
        }
      },
      '/download': {
        // target:'http://192.168.8.209:9005',//xy
        target: 'http://192.168.4.137:7777',//xy
        // target:'http://192.168.3.3:9006',//xy
        changeOrigin: true,
        // pathRewrite: {
        //   '^\/44': ''
        // }
      },
      '/terrain8089': {
        // target:'http://192.168.8.209:9005',//xy
        target: 'http://192.168.4.126:8089',//xy
        // target:'http://192.168.3.3:9006',//xy
        changeOrigin: true,
        pathRewrite: {
          '^\/terrain8089': ''
        }
      },


      //南部战区
      // '/9527':{
      //   target:'http://192.168.4.154:9009',
      //   changeOrigin:true,
      //   pathRewrite: {
      //     '^\/9527': ''
      //   }
      // },

      // '/inspectserver': {
      //   target: 'http://192.168.4.154:9005',//xy
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^\/inspectserver': ''
      //   }
      // },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}

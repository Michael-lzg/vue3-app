// const IS_PROD = ['production', 'test'].includes(process.env.NODE_ENV)
// const path = require('path')
// const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    port: 8888, // 端口号
    host: '0.0.0.0',
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    proxy: {
      '/api': {
        target: 'http://xxxx.com',
        ws: true,
        changeOrigin: true
      }
    }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    sourceMap: true,
    // css预设器配置项
    loaderOptions: {
      postcss: {
        // options here will be passed to postcss-loader
        plugins: [
          require('postcss-px2rem')({
            remUnit: 100
          })
        ]
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // configureWebpack: config => {
  //   config.plugins.push(new SkeletonWebpackPlugin({
  //     webpackConfig: {
  //       entry: {
  //         app: path.join(__dirname, './src/common/entry-skeleton.js')
  //       }
  //     },
  //     minimize: true,
  //     quiet: true,
  //     router: {
  //       mode: 'hash',
  //       routes: [
  //         // 不同路由界面配置不同的模板
  //         {
  //           path: '/',
  //           skeletonId: 'skeleton2'
  //         },
  //         {
  //           path: '/list',
  //           skeletonId: 'skeleton1'
  //         }
  //       ]
  //     }
  //   }))
  // }
}

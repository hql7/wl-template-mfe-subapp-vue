const path = require("path");
const { name } = require("./package");
const config = require('../config/env-configs').config;
// gzip压缩
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// 分析包大小
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  // publicPath: config.admin.entryPath + ':' + config.admin.entryPort,
  outputDir: "dist",
  assetsDir: "static",
  filenameHashing: true,
  productionSourceMap: false,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  devServer: {
    // host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    // port: config.admin.entryPort,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/css/variables/variables.scss";`
      }
    }
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src")
      }
    },
    // 把子应用打包成 umd 库格式
    output: {
      library: `${name}-[name]`,
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${name}`
    },
    // gzip
    plugins: [
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]", //目标资源名称
        algorithm: "gzip",
        test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i, //处理所有匹配此 {RegExp} 的资源
        threshold: 10240,//只处理比这个值大的资源。按字节计算(楼主设置10K以上进行压缩)
        minRatio: 0.8 //只有压缩率比这个值小的资源才会被处理
      }),
      // 分析包大小
      // new BundleAnalyzerPlugin()
    ],
    externals: {
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
    }
  }
};

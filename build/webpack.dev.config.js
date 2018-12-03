'use strict';
const PORT = 3000;
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');

let webpackDevServerConfig = {
  mode: 'development',
  // 入口配置
  entry: [
    'babel-polyfill', // 原生支持
    'react-hot-loader/patch', // 局部更新
    './index.js'
  ],
  devtool: 'cheap-module-source-map',
  plugins: [
    // 美化 console 输出
    new webpack.NamedModulesPlugin(),
    // 开启全局的模块热替换（HMR）
    new webpack.HotModuleReplacementPlugin(),
    // 编译完成在再浏览器打开项目
    new OpenBrowserWebpackPlugin({url: `http://0.0.0.0:${PORT}`}), // {url: `http://localhost:${PORT}`}
    // 编译时定义全局变量，用于判断执行环境 | 配合cross_env插件使用，它是运行跨平台设置和使用环境变量的脚本
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  devServer: {
    // hot: true,
    hotOnly: true, // 只热替换，不自动刷新
    port: PORT,
    inline: true, // 实时刷新
    publicPath: baseWebpackConfig.output.publicPath,
    host: '0.0.0.0',
    // 是否关闭用于DNS重绑定的HTTP请求的host检查，它通常用于搭配 --host 0.0.0.0 使用，
    // 因为你想要其它设备访问你本地的服务，但访问时是直接通过 IP 地址访问而不是 HOST 访问，所以需要关闭 HOST 检查。
    disableHostCheck: true,
    // 把项目根目录下的src目录设置成DevServer服务器的文件根目录
    contentBase: path.resolve(__dirname, 'src'),
    // 可以保证类似http://localhost:8080/aa的请求返回跟http://localhost:8080/一样的页面，
    // 这样才能用同一个js根据路径的不同去往不同的路由
    historyApiFallback: true
  },
  // dev环境打包的单个js文件可能过大，通过该方式取消警告
  performance: {
    hints: process.env.NODE_ENV === 'development' ? false : 'warning'
  }
};
module.exports = merge(baseWebpackConfig, webpackDevServerConfig)
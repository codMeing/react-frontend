'use strict';
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.config.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

let webpackBuildConfig = {
  mode: 'production',
  // 入口配置
  entry: [
    'babel-polyfill', // 浏览器原生支持
    'react-hot-loader/patch', // 局部更新
    './index.js'
  ],
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
   }),
    // 编译时定义全局变量，用于判断执行环境
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};

module.exports = merge(baseWebpackConfig, webpackBuildConfig);
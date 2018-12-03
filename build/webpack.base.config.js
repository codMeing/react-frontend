'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//用于在构建前清除dist目录中的内容
const CleanWebpackPlugin = require('clean-webpack-plugin');

let baseWebpackConfig = {
  // 指定找入口文件所在文件夹
  context: path.resolve(__dirname, '../src/test'),
  entry: './index.js',
  output: {
    // 打包出的文件名
    filename: '[name].bundle.[hash:8].js',
    // 打包出的文件输出路径
    path: path.resolve(__dirname, '../dist'),
    publicPath: "/" // 编译后模板文件地址
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        // use: ['babel-loader'],
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
        }
      },
      {
        test: /\.(less|css)$/i,
        use:['css-hot-loader',MiniCssExtractPlugin.loader,"css-loader","less-loader",{
          loader: "postcss-loader",
          options: {
            ident: 'postcss',
            plugins: () => [
              require('autoprefixer')("last 100 versions")
            ]
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000, // 大于就用文件形式，小于就压缩成base64
            name: 'img/[name].[hash:7].[ext]'
          }
        }]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'media/[name].[hash:7].[ext]'
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    //用于在构建前清除dist目录中的内容
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),       // 根目录
      verbose: true,        　　　　　　　　　　// 开启在控制台输出信息
    }),
    // dist目录下生成html模板文件
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    // 样式代码分离
    // new ExtractTextWebpackPlugin('styles.css'), // (webpack4废弃)
    new MiniCssExtractPlugin({
      filename: "[name].css", // **注意**这里不能使用hash，否则无法实现热跟新，如果有hash需要，可以开发环境和生产环境分开配置成[name].[chunkhash:8].css
      chunkFilename: "[id].css" // 构建时生成的文件名
    })
  ],
  resolve: {
    // 设置自动解析的扩展
    extensions: ['.web.js', '.js', '.json', '.jsx', '.less', '.css'],
    // 设置路径别名
    alias: {
      '@': path.resolve(__dirname, '../src/')
    }
  }
};

module.exports = baseWebpackConfig;
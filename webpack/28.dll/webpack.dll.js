/**
 * 使用dll技术，对某些库（第三方库：vue、react、jquery...）进行单独打包
 *
 * 当执行指令 webpack 时，默认查找webpack.config.js文件
 * 需求：运行 webpack.dll.js 文件 --> webpack --config webpack.dll.js
 */
/* eslint-disable import/no-extraneous-dependencies */
const {
  resolve
} = require('path');
const Webpack = require('webpack');

module.exports = {
  entry: {
    // 最终打包生成的[name] --> jquery
    // ['jquery'] --> 要打包的库名：jquery
    jquery: ['jquery'],
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash]', // 打包的库里面向外暴露出去的内容叫什么名字
  },
  plugins: [
    // 打包生成一个manifest.json --> 提供和jquery映射
    new Webpack.DllPlugin({
      name: '[name]_[hash]', // 映射库暴露的内容名称
      path: resolve(__dirname, 'dll/manifest.json'), // 输出文件路径
    }),
  ],
  mode: 'production',
};
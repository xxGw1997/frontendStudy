const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  // entry: {
  //   index: './src/js/index.js',
  //   test: './src/js/test.js',
  // },
  output: {
    // [name]：取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    // 打包html资源并压缩
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  /*
    1、可以将node_modules中的代码单独打包成一个chunk输出；
    2、自动分析多入口chunk中有没有公共的文件，如果有，会打包成一个chunk公用。
  */
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  mode: 'production',
};
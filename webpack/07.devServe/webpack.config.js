const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  resolve
} = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [ //配置
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        exclude: /\.(css|js|html|less)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',

  //开发服务器 devServer: 用来自动化(自动编译,自动打开浏览器,自动刷新浏览器)
  //特点:只会在内存中编译打包,不会有任何输出
  //启动devServer指令为:webpack-dev-server
  //webpack5 使用 npx webpack serve
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    //启用gzip压缩
    compress: true,
    //端口号3000
    port: 3000,
    //自动打开浏览器
    open: true
  }
}
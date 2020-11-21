const { resolve } = require('path')
const {HtmlWebpackPlugin} = require('html-webpack-plugin')

module.export = {
  entry: './src/index.js',
  output: {
    filename:'built.js',
    path:resolve(__dirname, 'build')
  },
  plugins:[
    new HtmlWebpackPlugin()
  ],
  mode:'development'
}
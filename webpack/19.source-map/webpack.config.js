/*
  source-map：一种提供源代码到构建后代码映射的技术（如果构建后代码出错了，通过映射可以追溯到源代码出错的地方）
    [inline-|hidden-|eval][nosources-][cheap-[module-]]source-map
      1.source-map：外部
        错误代码准确信息 和 源代码的错误位置
      2.inline-source-map：内联 --> 只生成一个内联source-map
        错误代码准确信息 和 源代码的错误位置
      3.hidden-source-map：外部（作用：为了隐藏源代码）
        错误代码的错误原因，但是没有错误的位置
        不能追溯到源代码的错误位置，只能提示到构建后的代码的错误位置
      4.eval-source-map：内联 --> 每一个文件都生成对应的source-map，都在eval
        错误代码准确信息 和 源代码的错误位置
      5.nosources-source-map：外部（作用：为了隐藏源代码）
        错误代码准确信息，但是没有任何源代码信息
      6.cheap-source-map：外部
        错误代码准确信息，但是没有任何源代码信息 --> 只能精确到行
      7.cheap-module-source-map：外部
        错误代码准确信息，但是没有任何源代码信息 --> 只能精确到行
        module会将loader的source map加入
      内联和外部的区别：1、外部生成的文件，内联没有；2、内联构建速度更快；
      开发环境：速度快，调试更友好
        速度快（eval > inline > cheap > ...）
          eval-cheap-source-map
          eval-source-map
        调试更友好
          source-map
          cheap-module-source-map
          cheap-source-map
        --> eval-source-map / eval-cheap-module-source-map
        生产环境：源代码要不要隐藏？调试要不要友好？（内联会让代码体积变得非常大，所以在生产环境下不用内联）
          源代码隐藏
            hidden-source-map （只隐藏源代码，会提示构建后代码信息）
            nosources-source-map （全部隐藏）
          调试更友好
            source-map
            cheap-module-source-map
*/

const {
  resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/js/index.js', './src/index.html'],
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      // loader的配置
      {
        // 处理 less 资源
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        // 处理 css 资源
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // 处理图片资源
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          esModule: false, // 关闭es6模块化
          outputPath: 'images',
        },
      },
      {
        // 处理html中的img资源
        test: /\.html/,
        loader: 'html-loader',
      },
      {
        // 处理其他资源
        exclude: /\.(less|css|png|jpg|gif|html|js)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media',
        },
      },
    ],
  },
  plugins: [
    // plugins 的配置
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true,
    hot: true,
  },
  devtool: 'eval-source-map',
};
const {
  resolve
} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 定义nodejs环境变量，决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production';

/*
    正常来讲，一个文件只能被一个loader处理
    当一个文件要被多个loader处理，需要指定loader执行的先后顺序：对于此处的js文件，先执行eslint，在执行babel
*/

// 复用loader：定义为一个变量
const commonCssLoader = [
  // 还需要在package.json中定义browserslist
  MiniCssExtractPlugin.loader,
  'css-loader',
  // postcss的配置在postcss.config.js中
  'postcss-loader',
];

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    // 1、对css做兼容性处理；2、将css文件变成commonjs模块加载到js中；3、提取css成单独文件
    rules: [{
        test: /\.css$/,
        use: [
          ...commonCssLoader,
        ],
      },
      // 1、将less文件编译成css文件；2、对css做兼容性处理；3、将css文件变成commonjs模块加载到js中；4、提取css成单独文件
      {
        test: /\.less$/,
        use: [
          ...commonCssLoader,
          'less-loader',
        ],
      },
      // 使用eslint对js文件做语法检测
      {
        // 在 package.json 中配置 eslintConfig --> airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          // 设置自动修改错误
          fix: true,
        },
      },
      // 对js做兼容性处理
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: {
                  version: 3
                },
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17',
                },
              },
            ],
          ],
        },
      },
      // 打包图片资源
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'images',
        },
      },
      // 打包html资源
      {
        test: /\.html/,
        loader: 'html-loader',
      },
      // 打包其他资源
      {
        exclude: /\.(html|css|less|js|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'media',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 对输出的css文件重命名
      filename: 'css/built.css',
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin(),
    // 打包html资源并压缩
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  mode: 'production',
};
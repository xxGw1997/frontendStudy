const {
  resolve
} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

// 定义nodejs环境变量，决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production';

/*
  PWA：渐进式网络开发应用程序（离线可访问）
    workbox --> workbox-webpack-plugin
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
    filename: 'js/built[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    // 1、对css做兼容性处理；2、将css文件变成commonjs模块加载到js中；3、提取css成单独文件
    rules: [
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
      {
        // 以下loader只会匹配一个
        // 注意：oneOf中两个配置不能处理同一种类型的文件
        oneOf: [{
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
          // 对js做兼容性处理
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              /*
                开启多进程打包
                多进程启动大概为600ms，进程通信也有开销。
                只有工作消耗时间比较长，才进行多进程打包。此处开启多进程，打包时间更长。
              */
              {
                loader: 'thread-loader',
                options: {
                  workers: 2,
                },
              },
              {
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
                  // 开启babel缓存
                  // 第二次构建时，会读取之前的缓存
                  cacheDirectory: true,
                },
              },
            ],
          },
          // 打包图片资源
          {
            test: /\.(jpg|png|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[contenthash:10].[ext]',
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
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 对输出的css文件重命名
      filename: 'css/built[chunkhash:10].css',
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
    new WorkboxWebpackPlugin.GenerateSW({
      /*
        1、帮助serviceworker快速启动；
        2、删除旧的serviceworker
        生成一个serviceworker配置文件
      */
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  mode: 'production',
  devtool: 'source-map',
};
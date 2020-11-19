const {
  resolve
} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 定义nodejs环境变量，决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production';

/*
    缓存
      babel缓存
        cachaDirectory: true
        --> 第二次打包构建速度更快
      文件资源缓存
        hash：每次webpack构建打包时会生成唯一的hash值
          问题：因为js和css使用同一个hash值，如果重新打包，会导致所有缓存失效
        chunkhash：根据chunk生成的hash，如果打包源来自同一个chunk，那么hash值就一样
          问题：js和css的hash值还是一样的，因为css是在js中被引进来的，同属于一个chunk
        contenthash: 根据文件内容生成的hash值，不同文件的hash值一定是不一样的
        --> 让代码上线运行缓存更好使用
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
  ],
  mode: 'production',
  devtool: 'source-map',
};
/**
 * webpack.config.js  webpack配置文件
 * 作用:指示webpack 干哪些活(当运行 webpack指令时,会加载里面的配置)
 * 
 * 所有构建工具都是基于nodejs 平台运行的 模块化默认采用commonjs
 */

//用来拼接绝对路径方法
const {
  resolve
} = require('path')

module.exports = {
  //webpack配置
  //入口文件
  entry: './src/index.js',
  //输出文件
  output: {
    //输出的文件名
    filename: 'built.js',
    //输出路径
    //__dirname: nodejs 的变量 代表当前目录的绝对路径
    path: resolve(__dirname, 'build'),
    //loader的配置
    module: {
      loader: 'postcss-loader',
      ident: 'postcss',
      options: {
        postcssOptions: {
          //或者将插件引入写在单独的配置js中
          //config: './config/postcss.config.js',
          plugins: () => [
            require('postcss-preset-env')()
          ]
        }
      }
      // rules: [
      //   //详细的loader配置
      //   {
      //     //匹配哪些文件
      //     test: /\.css$/,
      //     //使用哪些loader
      //     use: [
      //       //use数组中loader执行顺序,从尾部开始
      //       //创建style标签,将js中的样式资源插入进去,添加到页面head中生效
      //       'style-loader',
      //       //将css文件变成commonjs模块加载js中,里面内容是样式字符串
      //       'css-loader'
      //     ]
      //   }
      // ]
    },
    //plugins的配置
    plugins: [
      //详细的plugins的配置
    ],
    //模式
    mode: 'development' //开发模式
    // mode:'production'  //生产模式
  }
}
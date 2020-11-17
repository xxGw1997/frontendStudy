/**
 * webpack.config.js  webpack的配置文件
 * 作用:指示webpack干哪些活(当运行webpack指令时,会加载里面的配置)
 * 所有构建工具都是基于nodejs平台运行的  模块化默认采用commonjs
 */
/**
 * loader: 1.下载 2.使用(配置loader)
 * plugins: 1.下载 2.引入  3.使用
 */


//resolve用来拼接绝对路径的方法
const {
    resolve
} = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    //webpack配置
    //入口起点
    entry: './src/index.js',
    //输出
    output: {
        //输出文件名
        filename: 'built.js',
        //输出路径
        //__dirname nodejs的变量,代表当前文件的目录绝对路径
        path: resolve(__dirname, 'build')
    },
    //loader的配置
    module: {
        rules: [
            //详细loader配置
            {
                test: /\.css$/, //匹配哪些文件
                use: [
                    'style-loader', //创建一个style标签,将js中的样式资源插入进去,添加到页面的head中生效
                    'css-loader', //将css文件变成commonjs模块加载到js中,里面的内容是字符串
                    'postcss-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            //处理图片资源
            //问题: 默认处理不了html中img图片
            {
                test: /\.(jpg|png|gif)$/,
                //使用一个loader
                //下载 url-loader 和 file-loader
                loader: 'url-loader',
                options: {
                    //当发现大小小于8kb,就会被base64处理
                    //base64:减少请求数量(减轻服务器压力)
                    //缺点:图片体积更大(文件请求速度更慢)
                    limit: 220 * 1024,
                    //问题:因为url-loader默认使用es6模块化解析,而html-loader引入图片是commonjs
                    //解析时会出问题:[object Module]
                    //解决:关闭url-loader的es6模块化,使用commonjs去解析
                    esModule: false,
                    //[hash:10]去图片的hash的前10位
                    //[ext]取文件原来的扩展名
                    name: '[hash:10].[ext]'
                }
            },
            {
                test: /\.html$/,
                //处理html文件中的img图片(负责引入img,从而能被url-loader进行处理)
                loader: 'html-loader'
            }
        ]
    },
    //plugins的配置
    plugins: [
        //详细plugins的配置
        //html-webpack-plugin
        //功能: 默认创建一个空的html,自动引入打包输出的所有资源(js/css)
        new HtmlWebpackPlugin({
            //复制 ./src/index.html 文件,并自动引入打包输出的所有资源
            template: './src/index.html'
        })
    ],
    //模式
    mode: 'development', //开发模式
    // mode:'production'
}
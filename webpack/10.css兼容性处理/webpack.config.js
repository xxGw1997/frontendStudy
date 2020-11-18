const {
    resolve
} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


//设置nodejs环境变量
// process.env.NODE_ENV = 'development'

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                /**
                 * css兼容性处理:postcss --> postcss-loader postcss-preset-env
                 * 帮postcss找到package.json 中browserslist里面的配置,通过配置加载指定的css兼容性样式
                 */
                //1.使用loader 的默认配置
                'postcss-loader'
                //2.修改loader的配置
                // {
                //     loader: 'postcss-loader',
                //     options: {
                //         ident: 'postcss',
                //         plugins: () => [
                //             //postcss的插件
                //             require('postcss-preset-env')()
                //         ]
                //     }
                // }
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        })
    ],
    mode: 'development'
}
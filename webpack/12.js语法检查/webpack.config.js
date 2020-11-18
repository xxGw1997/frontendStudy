const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
    resolve
} = require("path");

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            /**
             * 语法检查:eslint-loader eslint
             * 注意:只检查用户自己写的源代码,不需要检查第三方的库
             * 设置检查规则:
             * package.json中 eslintConfig中设置
             * airbnb
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    //自动修复eslint错误
                    fix: true
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}
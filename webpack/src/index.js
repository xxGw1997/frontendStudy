/*
  index.js webpack 入口文件

  1.运行指令:
    开发环境  webpack ./src/index.js -o  ./build/built.js --mode=development
    webpack会以 ./src/index.js 为入口文件开始打包,打包后输出到 ./build/built.js文件中
    整体打包环境是开发环境

    生产环境  webpack ./src/index.js -o  ./build/built.js --mode=production

    2.结论:
      1.webpack 能处理js/json资源,  不能处理css/img等其他资源
      2.生产环境比开发环境多一个压缩js代码
      3.能将ES6模块化编译处理成浏览器认识的代码
  */

//引入样式资源
import "./index.css"

export function add(x, y) {
  return x + y
}

console.log(add(1, 2))
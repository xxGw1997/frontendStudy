#  vue项目中vw+rem h5 移动端适配方案

## 1、在App.vue 文件中 给html标签加上font-size:10vw;
```
  html {
    font-size: 10vw;
  }
```

## 2、打开命令行 执行以下命令 安装postcss-px2rem

### 安装这个三方插件后,在本地项目开发时就可以按照ui设计稿的具体px进行开发，后期postcss-px2rem会根据这个px进行转换成rem单位
### 在App.vue 文件中 font-size:10vw 后,如果动态切换屏幕的大小不会实时改变html的font-size的值,性能较好

```
npm install postcss-px2rem --save
```

## 3、使用@vue-cli进行创建项目的话需要在项目根目录创建vue.config.js文件来修改css配置

### vue.config.js文件内容代码如下:
```
  module.exports = {
    lintOnSave: false, //关闭eslint
    css: {
      loaderOptions: {
        postcss: {
          plugins: [
            require('postcss-px2rem')({
              remUnit: 75
            }), // 换算的基数
          ]
        }
      }
    }
  }
```
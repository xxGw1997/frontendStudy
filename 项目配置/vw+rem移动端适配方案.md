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
              remUnit: 37.5
            }), // 换算的基数
          ]
        }
      }
    }
  }
```


## 经过实验,以上方案不够好,故需要进一步优化
### 如果引入了第三ui组件,则在实际项目中展示的ui组件大小会比实际的小,因为postcss会把第三方ui组件的px也转换成rem,而引入的第三方ui组件自身已经做过适配了,所以做适配的时候需要排除第三方ui组件

## 1、首先将上面方案删除/将vue.config.js中添加的代码删除
## 2、再安装postcss-px2rem-exclude 
```
npm install postcss-px2rem-exclude --save
```
## 3、在项目的根目录中创建postcss.config.js文件 来配置需要绕过的px转换
### postcss.config.js文件内容代码如下:
```
module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px2rem-exclude': {
      remUnit: 37.5,
      exclude: /node_modules/i,
    },
  },
}

```
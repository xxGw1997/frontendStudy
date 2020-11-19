/* eslint-disable no-console */

import { mul } from './test';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

console.log(sum(1, 2, 3, 4, 5, 6, 7));

console.log(mul(2, 4));
/**
 * 1、eslint不认识window、navigator等全局变量
 *   解决：修改package.json中的eslintConfig配置：
 *      "env": {
 *        "browser": true // 支持浏览器全局变量
 *       }
 * 2、serviceWorker代码必须运行在服务器上
 *   --> nodejs
 *   --> npm i serve -g
 *        serve -s build 启动服务器，将build中的所有资源作为静态资源暴露出去
 */

// 注册serviceWorker
// 处理兼容性问题

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then(() => {
        console.log('serviceWorker注册成功');
      })
      .catch(() => {
        console.log('serviceWorker注册失败');
      });
  });
}

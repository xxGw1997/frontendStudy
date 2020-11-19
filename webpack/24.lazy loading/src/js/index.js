/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable import/first */
/* eslint-disable no-console */

console.log('index.js文件被加载了~');

// import { mul } from './test';

document.getElementById('btn').onclick = function () {
  // 懒加载：当文件需要使用时才加载
  // 预加载 prefetch：在使用之前提前加载js文件
  // 正常加载可以认为是并行的（同一时间加载多个文件）
  // 预加载 prefetch：等其他资源加载完毕，浏览器空闲了，再加载其他资源（慎用，会有兼容性问题）
  import (/* webpackChunkName: 'test', webpackPrefetch: true */'./test.js').then(({ mul }) => {
    console.log(mul(2, 5));
  })
};
/* eslint-disable no-console */

/*
  通过js代码，让一个文件被单独打包成一个chunk
  import 动态导入语法，能将某个文件单独打包
*/

import( /* webpackChunkName: 'test' */ './test').then(({
  mul,
  sub
}) => {
  // 文件加载成功
  console.log('乘法：', mul(2, 5));
  console.log('减法：', sub(2, 5));
}).catch(() => {
  console.log('文件加载失败~~~');
});

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

console.log(sum(1, 2, 3, 4, 5, 6, 7));
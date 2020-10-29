/**
 * 思想就是将参数逐渐传递下去,到最后将参数都收集完后后再统一一起处理
 */

let currying = (fn, ...args) => {
  console.log('fn.length:', fn.length)
  console.log('args.length:', args.length)
  if (fn.length > args.length) {
    return (...arguments) => {
      return currying(fn, ...args, ...arguments)
    }
  } else {
    return fn(...args)
  }
}

let addSum = (a, b, c, d) => a + b + c + d
let add = currying(addSum)
console.log(add(1)(2)(3, 4))
// console.log(add(1, 2)(3))
// console.log(add(1, 2, 3))
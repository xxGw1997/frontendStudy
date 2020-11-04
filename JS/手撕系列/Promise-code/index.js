const MyPromise = require('./MyPromise')

let promise = new MyPromise((resolve, reject) => {
  // resolve('success')
  // reject('error')
  // throw new Error('Exception Error')
  setTimeout(() => {
    resolve('succuss')
  }, 2000);
})

promise.then(value => {
  console.log('FullFilled:' + value)
}, reason => {
  console.log('failed')
  console.log('rejected:' + reason)
})
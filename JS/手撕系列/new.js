/**
 * 首先要搞清楚在真正的new 时,js内部做了哪些操作
 * 1、先创建一个空对象
 * 2、将构造函数的作用域赋值给新对象，即
 */



//正常new
function Animal(type,speak){
  this.type = type
}

Animal.prototype.bar = function(speak){
  console.log(`${this.type}:${speak}`)
}

let dog = new Animal('dog')
dog.bar('汪汪汪~')

//自己手写new
function _new(fn,...args){
  let obj = Object.create(fn.prototype) //相当于创建一个空对象的同时,将这个obj的__proto__ 指向 fn的prototype
  let res = fn.apply(obj,args)
  return res instanceof Object ? res : obj
}

let cat = _new(Animal,'cat')
cat.bar('喵喵喵~')

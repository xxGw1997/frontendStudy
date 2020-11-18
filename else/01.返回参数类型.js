// 实现一个函数，以字符串形式（要求字母小写）返回参数类型

function returnArgType(arg){
    return Object.prototype.toString.call(arg).slice(8,-1).toLowerCase()
}

let a = undefined
console.log(returnArgType(a))

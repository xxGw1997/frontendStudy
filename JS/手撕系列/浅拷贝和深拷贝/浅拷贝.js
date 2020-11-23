function checkArgType(target) {
    return Object.prototype.toString.call(target).slice(8, -1)
}

//方式1:手写
function lowCopy1(obj) {
    let copyObj
    checkArgType(obj) === 'Object' ? copyObj = {} : copyObj = []
    for(let i in obj){
        if(obj.hasOwnProperty(i)){
            copyObj[i] = obj[i]
        }
    }
    return copyObj
}


//方式2:Object.assign   ===>    针对于对象浅拷贝
let obj1 = {}   //需要拷贝的对象
//Object.assign 的作用是将两个对象合并并且返回这个合并后的对象,所以使用该方法将需要拷贝的对象和一个空对象进行合并然后返回这个对象就完成了
const obj2 = Object.assign({},obj1)

//方式3:数组api     ===>   针对于数组浅拷贝
//1、Array.prototype.concat()
let arr1 = [1,2,3,4,5]  //需要拷贝的数组
//concat方法用于合并两个数组并且返回合并后的数组,所以使用该方法用空数组和需要拷贝的数组进行合并返回一个新的数组
let arr2 = [].concat(arr1)

//2、Array.prototype.slice()
//slice方法用于进行数组的截取并返回一个新的数组
let arr3 = arr1.slice()

//3、展开运算符
let arr4 = [...arr1]
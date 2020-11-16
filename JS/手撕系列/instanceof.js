// instanceof 主要就是判断某个实例对象是否属于某个类型,或者判断某个实例是否是其父类型或祖先类型的实例

// 内部实现思路只要右边的prototype在左边的原型链上即可
// 所以需要遍历左边的原型链,直到找到右边的prototype,或者为null(因为原型链的尽头就是null),则返回false

function _instanceof(left,right){
    const rightVal = right.prototype
    const leftVal = left.__proto__
    while(true){
        if(leftVal === null) return false     //找到尽头还没找到直接false
        if(leftVal === rightVal) return true    //找到了返回true
        leftVal = leftVal.__proto__             //到这没找到则沿着原型链继续往上找
    }
}

function Animal(type){
    this.type = type
}

Animal.prototype.say = function(something){
    console.log(`${this.type}说something`)
}

function Cat(){
}



console.log('原生:',)
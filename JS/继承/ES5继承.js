function Father(firstName,money){
    this.firstName = firstName
    this.money = money
}

Father.prototype.speak = function(something){
    console.log(`我是你爹,${this.firstName}家留给你${this.money}元,${something}`)
}

function Son(firstName,money){
    Father.call(this,firstName,money)
}

(function(){
    let Super = function(){}
    Super.prototype = Father.prototype
    Son.prototype = new Super()
})()

Son.prototype.constructor = Son

let son = new Son('yang',1000000)

son.speak('这是我爹说的')

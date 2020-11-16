//ES6继承就是语法糖,本质还是ES5那套

class Father{
    constructor(firstName,money){
        this.firstName = firstName
        this.money = money
    }
    speak(something){
        console.log(`我是你爹,${this.firstName}家留给你${this.money}元,${something}`)
    }
}

class Son extends Father{
    constructor(firstName,money,selfMoney){
        super(firstName,money)
        this.selfMoney = selfMoney
    }

    speak(something){
        super.speak(something)
    }

    speakLoud(){
      console.log(`我一共有${this.money+this.selfMoney}元`)  
    }
}

let son = new Son('yang',1000000,200000)
son.speak('我爹说的')
son.speakLoud()
class PromiseClass {
    static PENDING = "pending"
    static FUFILED = "fulfiled"
    static REJECTED = "rejected"
    constructor(executor) {
        this.status = PromiseClass.PENDING
        this.value = null
        this.callbacks = []
        try {
            executor(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }

    resolve(value) {
        if (this.status == PromiseClass.PENDING) {
            this.status = PromiseClass.FUFILED
            this.value = value
            setTimeout(() => {
                this.callbacks.map(cb => {
                    cb.onFulfilled.call(this, value)
                })
            })
        }
    }
    reject(reason) {
        if (this.status == PromiseClass.PENDING) {
            this.status = PromiseClass.REJECTED
            this.value = reason
            setTimeout(() => {
                this.callbacks.map(cb => {
                    cb.onRejected.call(this, reason)
                })
            })
        }
    }

    then(onFulfilled, onRejected) {
        if (typeof onFulfilled !== 'function') {
            onFulfilled = () => this.value
        }
        if (typeof onRejected !== 'function') {
            onRejected = () => this.value
        }

        let promise = new PromiseClass((resolve, reject) => {
            if (this.status == PromiseClass.PENDING) {
                this.callbacks.push({
                    onFulfilled: value => {
                        this.parse(promise,onFulfilled(value),resolve,reject)
                    },
                    onRejected: value => {
                        this.parse(promise,onRejected(value),resolve,reject)
                    }
                })
            }
            if (this.status == PromiseClass.FUFILED) {
                setTimeout(() => {
                    this.parse(promise,onFulfilled(this.value),resolve,reject)
                });
            }
            if (this.status == PromiseClass.REJECTED) {
                setTimeout(() => {
                    this.parse(promise,onRejected(this.value),resolve,reject)
                });
            }
        })
        return promise
    }

    parse(promise,res,resolve,reject){
        if(promise === res){
            throw new TypeError('Chaining cycle detected')
        }
        try {
            if(res instanceof PromiseClass){
                res.then(resolve,reject)
            }else{
                resolve(res)
            }
        } catch (error) {
            reject(error)
        }
    }

    static resolve(value){
        return new PromiseClass((resolve,reject)=>{
            if(value instanceof PromiseClass){
                value.then(resolve,reject)
            }else{
                resolve(value)
            }
        })
    }

    static reject(value){
        return new PromiseClass((resolve,reject)=>{
            if(value instanceof PromiseClass){
                value.then(resolve,reject)
            }else{
                reject(value)
            }
        })
    }

    static all(promises){
        const values = []
        return new PromiseClass((resolve,reject)=>{
            promises.forEach(promise=>{
                promise.then(value=>{
                    values.push(value)
                    if(values.length == promises.length){
                        resolve(values)
                    }
                },reason=>{
                    reject(reason)
                })
            })
        })
    }

    static race(promises){
        return new PromiseClass((resolve,reject)=>{
            promises.map(promise=>{
                promise.then(value=>{
                    resolve(value)
                },reason=>{
                    reject(reason)
                })
            })
        })
    }


}
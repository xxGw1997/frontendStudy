class PromiseClass {
    static PENDING = "pending"
    static FUFILED = "FULFILED"
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
                this.callbacks.map(cb=>{
                    cb.onFulfilled.call(this,value)
                })
            })
        }
    }
    reject(reason) {
        if (this.status == PromiseClass.PENDING) {
            this.status = PromiseClass.REJECTED
            this.value = reason
            setTimeout(() => {
                this.callbacks.map(cb=>{
                    cb.onRejected.call(this,reason)
                })
            })
        }
    }

    then(onFulfilled, onRejected) {
        if (typeof onFulfilled !== 'function') {
            onFulfilled = () => {}
        }
        if (typeof onRejected !== 'function') {
            onRejected = () => {}
        }

        if(this.status == PromiseClass.PENDING){
            this.callbacks.push({
                onFulfilled:value=>{
                    try {
                        onFulfilled(value)
                    } catch (error) {
                        onRejected(error)
                    }
                },
                onRejected:value=>{
                    try {
                        onRejected(value)
                    } catch (error) {
                        onRejected(error)
                    }
                }
            })
        }


        if (this.status == PromiseClass.FUFILED) {
            setTimeout(() => {
                try {
                    onFulfilled(this.value)
                } catch (error) {
                    onRejected(error)
                }
            });
        }
        if (this.status == PromiseClass.REJECTED) {
            setTimeout(() => {
                try {
                    onRejected(this.value)
                } catch (error) {
                    onRejected(error)
                }
            });
        }
    }

}
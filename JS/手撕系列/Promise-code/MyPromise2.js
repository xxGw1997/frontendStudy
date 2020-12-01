class Ywx {
    static PENDING = "pending"
    static FUFILED = "FULFILED"
    static REJECTED = "rejected"
    constructor(executor) {
        this.status = Ywx.PENDING
        this.value = null
        this.callbacks = []
        try {
            executor(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {

        }
    }

    resolve(value) {
        if (this.status === Ywx.PENDING) {
            this.status = Ywx.FUFILED
            this.value = value
            setTimeout(() => {
                this.callbacks.map(cb => {
                    cb.onFulfilled.call(this, value)
                })
            });
        }
    }

    reject(reason) {
        if (this.status === Ywx.PENDING) {
            this.status = Ywx.REJECTED
            this.value = reason
            setTimeout(() => {
                this.callbacks.map(cb => {
                    cb.onRejected.call(this, value)
                })
            });
        }
    }

    then(onFufiled, onRejected) {
        if (typeof onFufiled !== 'function') {
            onFufiled = () => this.value
        }
        if (typeof onRejected !== 'function') {
            onRejected = () => this.value
        }

        let promise = new Ywx((resolve, reject) => {
            if (this.status === Ywx.PENDING) {
                this.callbacks.push({
                    onFufiled: value => {
                        this.parse(promise, onFufiled(value), resolve, reject)
                    },
                    onRejected: value => {
                        this.parse(promise, onRejected(value), resolve, reject)
                    }
                })
            }

            if (this.status === Ywx.FUFILED) {
                setTimeout(() => {
                    this.parse(promise, onFufiled(value), resolve, reject)
                });
            }

            if (this.status === Ywx.REJECTED) {
                setTimeout(() => {
                    this.parse(promise, onRejected(value), resolve, reject)
                });
            }
        })

        return promise
    }

    parse(promise, result, resolve, reject) {
        try {
            if (promise === result) {
                throw new TypeError('Chaining cycle detected')
            }
            if (result instanceof Ywx) {
                result.then(resolve, reject)
            } else {
                resolve(result)
            }
        } catch (error) {
            reject(error)
        }
    }


}
class MP{
    //promise的三个静态属性,用来表示promise的状态
    static PENDING = 'pending'
    static FULFILLED = 'fulfilled'
    static REJECTED = 'rejected'
    constructor(executor){
        //在创建promise实例时,会给实例上设置status属性,初始状态为pending状态
        this.status = MP.PENDING
        //value属性,可以用来传递给下一个promise的值
        this.value = null
        //回调函数数组,因为promise是异步任务,所以需要将对应的回调函数放入到回调队列中
        this.callbacks = []
        try {
            //执行用户传入的参数函数
            //这个函数中有两个参数分别是成功时执行的函数与失败时执行的函数
            //如果执行成功resolve函数,则就会调用then中对应成功的回调函数
            //如果执行失败reject函数,则就会调用then中对应失败的回调函数
            executor(this.resolve.bind(this),this.reject.bind(this))
        } catch (error) {
            //如果此时抛出异常则直接执行reject方法
            reject(error)
        }
    }

    //成功,
    //resolve就是将promise的状态改为成功状态,并且改变成功状态时的值,然后再将对应成功的回调函数执行
    resolve(value){
        //因为promise的状态是不可逆的,所以当状态为PENDING时,才可以进行成功的回调
        if(this.status == MP.PENDING){
            //如果状态是PENDING状态,则将status改为成功,并且附上成功时的值
            this.status = MP.FULFILLED
            this.value = value
            //执行对应的回调函数需要放在异步队列中去,不能影响主线程的同步任务
            setTimeout(() => {
                   this.callbacks.map(cb=>{
                       cb.onFulfilled.call(this,value)
                   })
            });
        }
    }

    //失败
    //reject就是将promise的状态改为失败状态,并且改变失败状态时的值,然后再将对应失败的回调函数执行
    reject(reason){
        //同成功一样,只是会改变为失败的状态与值
        if(this.status == MP.PENDING){
            this.statue = MP.REJECTED
            this.value = reason
            setTimeout(() => {
             this.callbacks.map(cb=>{
                cb.onRejected.call(this,reason)
             })   
            });
        }
    }

    then(onFulfilled,onRejected){
        //如果用户没有传递两个回调函数参数,
        //则需要将上一次的value值传递给下一次的,所以要手动帮用户设置两个回调函数并返回上一次的value
        if(typeof onFulfilled !== 'function'){
            onFulfilled = ()=> this.value
        }
        if(typeof onRejected !== 'function'){
            onRejected = ()=> this.value
        }

        let promise = new MP((resolve,reject)=>{
            //分别有三种情况
            //1.状态还是pending状态,日常中一般是会去请求接口,而请求接口是异步任务,所以走到这里时,状态还未被改变
            if(this.status == MP.PENDING){
                //当状态还是PENDING状态时,就需要将对应的成功回调与失败的回调先存入回调任务队列中,
                //等到resolve或者reject时再去将回调队列中对应的会调用执行
                this.callbacks.push({
                    onFulfilled:value=>{
                        //将返回的新的promise对象作为第一个参数
                        //第二个参数是执行对应成功回调函数的返回值
                        //返回的新的promise对象的成功方法与失败方法
                        this.parse(promise,onFulfilled(value),resolve,reject)
                    },
                    onRejected:value=>{
                        //同成功
                        this.parse(promise,onRejected(value),resolve,reject)
                    }
                })
            }

            //2.状态已经变为成功的状态时,比如通过时间是否是上午来判断是否成功
            //如果是上午则就执行resolve成功,进而会调用成功时的回调
            //否则就执行reject,进而会调用失败时的回调
            if(this.status == MP.FULFILLED){
                //这里为什么要放一个定时器呢
                //因为这个promise是一个异步执行的,如果下面有一段同步的代码就会阻塞
                //所以需要将回调的函数放到回调函数队列中去
                setTimeout(() => {
                    this.parse(promise,onFulfilled(this.value),resolve,reject)   
                });
            }

            //3.状态为拒绝状态,同成功
            if(this.status == MP.REJECTED){
                setTimeout(() => {
                    this.parse(promise,onRejected(this.value),resolve,reject)   
                });
            }
        })

        return promise

    }


    //parse方法接受4个参数
    /**
     * 
     * @param {返回的新的promise对象} promise 
     * @param {对应回调函数的返回值} res 
     * @param {返回的新的promise对象的成功方法} resolve 
     * @param {返回的新的promise对象的失败方法} reject 
     */
    parse(promise,res,resolve,reject){
        //先判断返回的promise和执行的结果res是否时同一个对象,如果是的话抛出一个TypeError
        if(promise === res){
            throw new TypeError('Chaining cycle detected')
        }
        try {
            //再判断这个返回的结果是不是一个新的promise,如果是
            if(res instanceof MP){
                //则继续调用这个promise的then方法就行
                res.then(resolve,reject)
            }else{
                //如果只是一个普通的值,则执行成功的方法并且把这个值传递给下一个promise就行
                resolve(res)
            }
        } catch (error) {
            reject(error)
        }
    }

    //构造函数上的成功方法
    //其实就是返回一个promise实例并且把值传给调用其中成功的方法就行,其他的与正常对象调用一样
    static resolve(value){
        return new MP((resolve,reject)=>{
            if(value instanceof MP){
                value.then(resolve,reject)
            }else{
                resolve(value)
            }
        })
    }


    //失败执行的方法
    static reject(value){
        return new MP((resolve,reject)=>{
            if(value instanceof MP){
                value.then(resolve,reject)
            }else{
                reject(value)
            }
        })
    }

    //all方法就是传入一个promise数组,其中只要有一个失败则就执行失败
    //需要所有的promise都成功才算成功
    //为了实现链式调用只需要返回一个新的promise就行
    static all(promises){
        const values = []   //用于保存传入的promise数组的结果,每成功一个就往数组中添加成功的结果
        return new MP((resolve,reject)=>{
            //循环遍历每一个promise
            promises.forEach(promise=>{
                //执行promise的then方法
                promise.then(value=>{
                    //如果成功了就会走这个方法,把成功的方法的返回值给压入values数组中
                    values.push(value)
                    //只有当传入的promises数组的长度等于values的长度时才执行MP的成功方法
                    if(promises.length == values.length){
                        resolve(values)
                    }
                },reason=>{
                    //只要有一个promise失败就执行MP的失败方法
                    reject(reason)
                })
            })
        })
    }

    //race方法是传入一个promise数组,只要其中哪个先返回结果,不论成功还是失败都将这个返回的结果return
    //同样为了实现链式调用需要返回一个新的promise实例
    static race(promises){
        return new MP((resolve,reject)=>{
            //遍历传入的promises数组
            promises.forEach(promise=>{
                //因为promise的状态是不可逆的,
                //所以只要其中某一个promise有结果了将结果作为参数就调用返回MP实例的对应的回调即可
                promise.then(value=>{
                    resolve(value)
                },reason=>{
                    reject(reason)
                })
            })
        })
    }
}
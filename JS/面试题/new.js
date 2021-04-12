function _new(fn,...args){
    let obj = Object.create(fn.prototype)
    let res = obj.apply(fn,args)
    return res instanceof Object ? obj:res
}
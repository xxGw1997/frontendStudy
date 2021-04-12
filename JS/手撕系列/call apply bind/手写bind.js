// Function.prototype.myBind = function (context = globalThis) {
//   let _this = this
//   // console.log('this:', this)
//   let args = [...arguments]
//   return () => {
//     context.fn = _this
//     let res = args.length > 0 ? context.fn(args) : context.fn()
//     delete context.fn
//     return res
//   }
// }


Function.prototype._bind = function(context = globalThis,args){
  let key = Symbol('KEY'),
      _this = this
  return ()=>{
    context[key] = _this
    context[key](args)
    delete context[key]
  }
}



const a = {
  name: 'a',
  say: function (s) {
    console.log(this.name + '+' + s)
  }
}

const b = {
  name: 'b',

}

a.say.myBind(b, 1)()
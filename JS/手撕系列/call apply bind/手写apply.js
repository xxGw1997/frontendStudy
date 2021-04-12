// Function.prototype.myApply = function(context = globalThis){
//     let args = [...arguments]
//     context.fn = this
//     context.fn(args)
//     let res = context.fn()
//     delete context.fn
//     return res
// }


// Function.prototype.myApply = function (context = globalThis) {
//   console.log('this:', this)
//   console.log('context:', context)
//   context.fn = this
//   const args = [...arguments]
//   const res = args.length > 1 ? context.fn(args) : context.fn()
//   delete context.fn
//   return res
// }

Function.prototype._apply = function(context = globalThis,args){
  let key = Symbol('KEY')
  context[key] = this
  context[key](args)
  delete context[key]
}


const a = {
  name: 'a',
  say: function () {
    console.log(this.name)
  }
}

const b = {
  name: 'b',

}

a.say.myApply(b)
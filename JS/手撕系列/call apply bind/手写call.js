// Function.prototype.myCall = function(context = globalThis) {
//     // 设置 fn 为调用 myCall 的方法
//     context.fn = this;
  
//     // 获取剩余参数
//     const otherArg = Array.from(arguments).slice(1);
  
//     // 调用这个方法，将剩余参数传递进去
//     context.fn(otherArg);
  
//     // 将这个方法的执行结果传给 result
//     let result = context.fn();
  
//     // 删除这个变量
//     delete context.fn;
  
//     // 返回 result 结果
//     return result;
//   };


Function.prototype.myCall = function(context = globalThis){
    let args =   Array.from(arguments).slice(1)
    context.fn = this
    let res = args.length>0?context.fn(args):context.fn()
    delete context.fn
    return res
}



  
  this.a = 1;
  
  const fn = function() {
    this.a = 2;
    console.log(this.a);
  }
  
  fn.myCall(fn);
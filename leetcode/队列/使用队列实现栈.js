/**
 *  
    push(x) -- 元素 x 入栈
    pop() -- 移除栈顶元素
    top() -- 获取栈顶元素
    empty() -- 返回栈是否为空
    你只能使用队列的基本操作-- 也就是 push to back, peek/pop from front, size, 和 is empty 这些操作是合法的。
    你所使用的语言也许不支持队列。 你可以使用 list 或者 deque（双端队列）来模拟一个队列 , 只要是标准的队列操作即可。
    你可以假设所有操作都是有效的（例如, 对一个空的栈不会调用 pop 或者 top 操作）。
 */

//  let MyStack = function(){
//    this.queue = []
//  }

//  MyStack.prototype.push = function(el){
//   this.queue.push(el)
//  }

//  MyStack.prototype.pop = function(){
//   return this.queue.pop()
//  }

//  MyStack.prototype.top = function(){
//   return this.queue[this.queue.length - 1]
//  }

//  MyStack.prototype.empty = function(){
//   return !this.queue.length
//  }

 class _MyStack {
   constructor(queue){
     this.queue = queue
   }


   push(el){
     this.queue.push(el)
   }

   pop(){
     return this.queue.pop()
   }

   top(){
     return this.queue[this.queue.length - 1]
   }

   empty(){
     return !this.queue.length
   }

 }

 let s = new _MyStack([1,2,3,4,5,6,7])

 s.push(11)

 console.log(s.queue)
/**
 * 观察者模式，属于行为型模式的一种，它定义了一种一对多的依赖关系，
 * 让多个观察者对象同时监听某一个主题对象。这个主题对象在状态变化时，
 * 会通知所有的观察者对象，使他们能够自动更新自己。
 * 以前我以为观察者模式就是发布订阅模式，但实际上观察者模式和发布订阅模式是有区别的。
 * 区别：观察者模式只有两个，一个是观察者一个是被观察者。
 * 发布订阅模式不一样，发布订阅模式还有一个中间层，发布订阅模式的实现是，
 * 发布者通知给中间层 => 中层接受并通知订阅者 => 订阅者收到通知并发生变化
 */

var targetObj = {
  name: 'xxgw'
}
var targetObj2 = {
  name: 'ywx'
}
// 定义值改变时的处理函数（观察者）
function observer(oldVal, newVal) {
  // 其他处理逻辑...
  targetObj2.name = newVal
  console.info('targetObj2的name属性的值改变为 ' + newVal);
}

// 定义name属性及其set和get方法（name属性为被观察者）
Object.defineProperty(targetObj, 'name', {
  enumerable: true,
  configurable: true,
  get: function () {
    return name;
  },
  set: function (val) {
    //调用处理函数
    observer(name, val)
    name = val
  }
});

targetObj.name = 'xxGw';
targetObj.name = 'xwy';
console.log(targetObj2.name)
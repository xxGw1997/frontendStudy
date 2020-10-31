/**
 * 发布订阅模式
 * 发布订阅模式包含了三个模块分别是:"订阅者"、"调度中心"、"发布者"
 * 这里的调度中心就相当于一个中间层
 * 举个最近自己身边的栗子🌰
 * 最近3070出来了,而我前些时间加了一个组装主机的人的wx,我只是想简单配一个主机,不需要很高的要求
 * 那些想要购买3070的人就属于订阅者--->👨
 * 组装主机的人就相当于调度中心--->📕
 * 而真正研发3070的厂商就属于发布者--->🏭
 * 在3070出来之前,很多人👨会在中间人📕那里预定,而我👨自己没有钱买不起3070,所以之前就没有和装机人📕预定3070
 * 此时在装机人📕那里会将这些预定3070的人👨给记录到一个名单,
 * 等到3070正式出来之后,装机人📕会依次按照这个名单去通知购买者👨可以进行付款购买了,
 * 但是他📕不会主动在wx通知我👨进行购买,因为我👨没有预定
 * 而在3070正式发布之前,装机人📕也不知道具体什么时候会有货,真正能够生产出3070的其实是厂商(发布者)🏭
 * 厂商(发布者)🏭生产出货时,第一时间调度中心装机人📕会得到消息,装机人📕得到消息后就会通知购买者进行购买了
 * 所以装机人起到一个中间人的作用
 * 购买者需要在装机人那里预定3070,在装机人那里生成一份名单
 * 工厂正式发布3070之前内部消息不直接通知大众,而是会先通知装机人
 * 装机人得到发布者的通知后,才会逐一通知各位买家
 * 这种模式的主要作用就是:每个角色都负责其专门负责的事情,将模块之间进行解耦
 * 订阅者只需要订阅消息,后续只要等待执行任务就行
 * 调度中心则负责手机订阅和通知订阅者执行任务就行
 * 发布者只需要进行发布消息,而不用通知到每一个人调用任务.
 */

class Event {
  constructor() {
  }
  //进行记录订阅者的回调对象,对象一般是一些对应事件的数组
  //某个事件一般会有一个或多个订阅者回调方法
  events = {}

  //添加订阅者的方法
  _addEventListener(type, fn) {
    //首先在events中查找有没有type事件类型的数组容器
    //如果有,则在对应type事件容器直接放入fn回调就行
    //如果没有,则先在events创建一个type事件容器再放入fn回调
    if (!this.events[type]) this.events[type] = []
    this.events[type].push(fn)
  }

  //发布时,通知事件执行
  _dispatchEvent(type, ...args) {
    this.events[type].forEach(fn => {
      fn(...args)
    });
  }

  //移除事件,万一别人反悔了呢
  _removeEventListener(type, handler) {
    // 无效事件抛出
    if (!(type in this.events)) {
      return new Error('无效事件')
    }
    if (!handler) {
      // 直接移除事件
      delete this.events[type]
    } else {
      const idx = this.events[type].findIndex(ele => ele === handler)
      // 抛出异常事件
      if (idx === -1) {
        return new Error('无该绑定事件')
      }
      // 移除事件
      this.events[type].splice(idx, 1)
      if (this.events[type].length === 0) {
        delete this.events[type]
      }
    }
  }
}




//test
//在node 环境下报错,这是为什么呢
let event = new Event()
function clock() {
  console.log('铃铃铃~起床啦')
}

event.addEventListener('wakeUp', clock)
event.dispatchEvent('wakeUp')
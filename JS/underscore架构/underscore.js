(function (root) {
  //构造函数      
  var _ = function (obj) { //数据源
    if (!(this instanceof _)) {
      return new _(obj);
    }

    this.wrap = obj;
  }

  _.map = function (arg1, arg2, arg3) {
    //相同的
    console.log(1)
  }

  //开启链式调用
  _.chain = function (obj) { //数据源
    var instance = _(obj); //特殊的实例对象
    instance._chain = true; //特殊的属性     凭证
    return instance;
  }

  var result = function (instance, obj) {
    if (instance._chain) {
      instance.wrap = obj;
      return instance;
    }
    return obj;
  }

  //args  上一道工序处理之后的结果
  _.max = function (args) {
    args.push("max", "long");
    return args;
  }

  //[1,2,3,,4,5,5,6,7,8,4,4,5]   数组去重 返回结果  去重之后的数组
  _.unique = function (array, callback) {
    var result = [];
    var i = 0;
    for (; i < array.length; i++) {
      var target = callback ? callback(array[i]) : array[i];
      if (result.indexOf(target) === -1) {
        result.push(target)
      }
    }
    return result;
  }

  _.each = function (array, callback) {
    var i = 0;
    for (; i < array.length; i++) {
      callback.call(array, array[i]);
    }
  }

  _.functions = function (obj) {
    var result = [];
    for (var key in obj) {
      result.push(key);
    }
    return result;
  }

  _.prototype.value = function () {
    return this.wrap;
  }

  // _.max =  ....   扩展

  //1: 找到 _ 静态属性 [map, unique, ....]     2: 遍历数组   _.prototype[item]     item?map:unique
  //搭架子
  _.mixin = function (obj) {
    _.each(_.functions(obj), function (key) {
      var func = obj[key];
      //unique
      _.prototype[key] = function () {
        var args = [this.wrap];
        //数组合并
        Array.prototype.push.apply(args, arguments);

        //this 判断是否需要链式调用   this._chain === true
        //func.apply(this, args)    数据进过某个工序处理之后的结果
        return result(this, func.apply(this, args)); //[数据源， 迭代器函数]
      }
    });
  }


  _.mixin(_);
  root._ = _;
})(this)


const install = function(Vue){
    //install 的作用就是 将我们的routers 实例共享给每一个vue组件

    //把所有的方法和组件初始化的时候进行混合
    Vue.mixin({
        beforeCreate(){
            //区分父子关系
            //先找到父亲,儿子找到父亲的属性,孙子找父亲的
            //组件声明周期调用顺序 先父后子
            if(this.$options.router){
                //将根实例放到了——routerRoot上
                this._routerRoot = this
                this._router = this.$options.router

                this._router.init(this)
            }else{
                //将根属性全部增加到了每一个组件上的_routerRoot上
                //所有组件都可以获取_routerRoot._router,这样就可以拿到路由的实例
                this._routerRoot = this.$parent && this.$parent._routerRoot
            }
        }
    })
}

export default install
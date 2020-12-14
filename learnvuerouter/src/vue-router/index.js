import install from './install'
class VueRouter{
    constructor(options){
        this.mode = options.mode
        this.routes = options.routes
        console.log(this.mode,this.routes)
    }

    init(app){      //路由的初始化
        console.log("根实例:",app)
        console.log(app._routerRoot)
        console.log(app._routerRoot._router)
    }
}

VueRouter.install = install

export default VueRouter
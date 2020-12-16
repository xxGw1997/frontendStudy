import install from './install'
import createMatcher from './create-matcher'
import HashHistory from './history/hash'
import Html5History from './history/html5'
class VueRouter{
    constructor(options){
        this.mode = options.mode
        console.log(this.mode,this.routes)

        //根据路由建立对应映射关系
        //根据路径找到对应组件
        //创建一个匹配器
        this.matcher = createMatcher(options.routes||[])

        switch (this.mode) {
            case 'hash'://this是router 实例
                this.history = new HashHistory(this)
                break;
            case 'history':
                this.history = new Html5History(this)
                break;
            default:
                break;
        }
    }

    init(app){      //路由的初始化
        //根据路径去跳转对应的组件
        const history = this.history

        const setupListener = ()=>{
            history.setupListener()
        }
        //这个方法应该是base上的
        this.history.transitionTo(
            history.getCurrentLocation(),
            setupListener
        )
    }
}

VueRouter.install = install

export default VueRouter
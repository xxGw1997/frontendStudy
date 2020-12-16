import Base from './base'

//确保有hash
function ensureSlash(){
    if(window.location.hash){
        return
    }
    window.location.hash = '/'
}

class Hash extends Base{
    constructor(router){
        super(router)
        ensureSlash()
    }
    getCurrentLocation(){
        return window.location.hash.slice(1)
    }

    setupListener(){
        //hash 值就是监控hash 的变化
        window.addEventListener('hashchange',()=>{
            this.transitionTo(this.getCurrentLocation())
        })
    }
}

export default Hash
import Base from './base'
class Html5 extends Base{
    constructor(router){
        super(router)
    }

    getCurrentLocation(){
        return window.location.pathname
    }

    setupListener(){
        window.addEventListener('popstate',()=>{
            this.transitionTo(this.getCurrentLocation())
        })
    }
}

export default Html5
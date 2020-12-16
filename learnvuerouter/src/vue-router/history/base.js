class Base{
    constructor(router){
        this.router = router
    }

    transitionTo(location,handler){
        //根据路径,match出对应的记录
        handler()
    }
}

export default Base
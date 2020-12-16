import createRouteMap from "./create-route-map"

function createMatcher(routes){
    console.log(routes)
    
    //扁平化
    let {pathMap} = createRouteMap(routes)
    //一个路径对应一个记录
    
    //matcher 有两个功能
    //1、添加路由,在原有的基础上动态的添加路由
    function addRoutes(routes){
        createRouteMap(routes,pathMap)
        console.log(pathMap)
    }
    
    //2、匹配,根据路径匹配对应的组件
    function match(path){

    }

    return {
        addRoutes,
        match
    }
}

export default createMatcher
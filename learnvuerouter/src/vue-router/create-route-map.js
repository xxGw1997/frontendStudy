export default function createRouteMap(routes,oldPathMap){
    let pathMap = oldPathMap || Object.create(null)
    routes.forEach(route => {
        addRouteRecord(route,pathMap)
    });

    return{
        pathMap
    }
}

function addRouteRecord(route,pathMap,parent){
    let path = parent?`${parent.path}/${route.path}`:route.path
    let record = {
        path,
        name:route.name,
        component:route.component
    }
    //根据路径匹配记录
    pathMap[path] = record
    //递归添加
    if(route.children){
        route.children.forEach(r=>{
            addRouteRecord(r,pathMap,record)
        })
    }
}
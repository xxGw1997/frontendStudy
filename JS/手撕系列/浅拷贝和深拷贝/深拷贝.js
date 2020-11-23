//1、最简易版本
let obj = {}
let cloneObject = JSON.parse(JSON.stringify(obj))


//2、完美
function clone(target,map = new WeakMap()){
    if(typeof target === 'object'){
        const isArray = Array.isArray(target)
        let cloneTarget = isArray?[]:{}
        if(map.get(target)){
            return map.get(target)
        }
        map.set(target,cloneTarget)

        // for(let key in target){
        //     cloneTarget[key] = clone(target[key],map)
        // }

        let keys = Object.keys(target); 
        let key; 
        while (key = keys.shift()) { 
         cloneTarget[key] = clone(target[key], map); 
        }





        return cloneTarget
    }else{
        return target
    }
}

// function forEach(array,callback){
//     let index = -1
//     const length = array.length
//     while(++index < length){
//         callback(array[index],index)
//     }
//     return array
// }
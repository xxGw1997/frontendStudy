//浅克隆
function lowClone(obj){
    let newObj = {}
    for(let i in obj){
        newObj[i] = obj[i]
    }
    return newObj
}

//深克隆
function deepClone(obj){
    let newObj
    if(typeof obj === 'object'){
        newObj = obj.constructor === Array?[]:{}
        for(let i in obj){
            if(typeof i === 'object'){
                newObj[i] = deepClone(obj[i])
            }else{
                newObj[i] = obj[i]
            }
        }
    }else{
        newObj = obj
    }
    return newObj
}
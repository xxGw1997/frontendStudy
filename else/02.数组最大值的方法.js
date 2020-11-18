function way1(arr){
    let max = -Number.MAX_VALUE
    arr.forEach(e=>{
        if(e>max) max = e
    })
    return max
}

function way2(arr){
    arr.sort((a,b)=>{
        return b-a
    })
    return arr[0]
}

function way3(arr){
    return Math.max.apply(null,arr)
}


let arr = [1,2,3,4,5,6,7,8,199,23,123,53,3]

console.log(way1(arr))

console.log(way2(arr))

console.log(way3(arr))
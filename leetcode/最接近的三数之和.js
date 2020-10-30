`给定一个包括  n 个整数的数组  nums  和 一个目标值  target。找出  nums  中的三个整数，
使得它们的和与  target  最接近。返回这三个数的和。假定每组输入只存在唯一答案。`

let ThreeSumClosest = function(arr,target){
    let len = arr.length
    if(len===3){
        return arr.reduce((total,cur)=>total+cur,0)
    }

    arr.sort((a,b)=>a-b)

    let res
    let minDiff = Infinity

    for(let i = 0;i<len-1;i++){
        let basic = arr[i]
        let left = i+1
        let right = len-1
        while(left<right){
            let sum = arr[left] + arr[right] + basic
            let diff = Math.abs(sum-target)
            if(diff<minDiff){
                minDiff = diff
                res = sum
            }
            if(sum<target){
                left++
            }else if(sum>target){
                right--
            }else{
                return res
            }
        }
    }
    return res
}

console.log(ThreeSumClosest([1,4,6,88,35,11,8],20))
// ThreeSumClosest([1,4,6,88,35,11,8],20)
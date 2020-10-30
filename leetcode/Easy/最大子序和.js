/**
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
    示例:
    输入: [-2,1,-3,4,-1,2,1,-5,4]
    输出: 6
    解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 */

 let maxSonSum = function(list){
    let len = list.length
    let max = list[0]
    for(let i=1;i<len;i++){
        list[i] = Math.max(0,list[i-1] + list[i])
        console.log('listi:'+list[i])
        if(list[i]>max) max=list[i]
    }
    console.log('arr:'+list)
    return max
 }

 console.log(maxSonSum([-2,1,-3,4,-1,2,1,-5,4]))
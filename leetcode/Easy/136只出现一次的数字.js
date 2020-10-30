/**
    给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

    说明：

    你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

    示例 1:

    输入: [2,2,1]
    输出: 1
    示例 2:

    输入: [4,1,2,1,2]
    输出: 4
 */

let onlyOneNumber = function(arr){
    let res = 0
    let len = arr.length
    for(let i=0;i<len;i++){
        res = res ^ arr[i]
    }
    return res
}

console.log(onlyOneNumber([1,2,3,4,5,6,7,8,9,9,8,7,6,5,4,3,2]))


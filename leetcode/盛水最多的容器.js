/**
    给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点  (i, ai) 。在坐标内
    画 n 条垂直线，垂直线 i  的两个端点分别为  (i, ai) 和 (i, 0)。找出其中的两条线，
    使得它们与  x  轴共同构成的容器可以容纳最多的水。
 */


let theMostWaterArea = function (arr) {
    let left = 0
    let right = arr.length - 1
    let leftLine = left
    let rightLine = right
    let maxArea = 0
    let curArea
    while (left < right) {
        if (arr[left] < arr[right]) {
            curArea = (right - left) * arr[left]
            left++
        } else {
            curArea = (right - left) * arr[right]
            right--
        }
        if (curArea > maxArea) {
            leftLine = left
            rightLine = right
            maxArea = curArea
        }
    }
    return {leftLine,rightLine}
}














// let theMostWaterArea = function(arr){
//     let left = 0
//     let right = arr.length - 1
//     let maxArea = 0
//     let curArea
//     while(left !== right){
//         if(arr[left] < arr[right]){
//             curArea = arr[left] * (right-left) * 10
//             left++
//         }else{
//             curArea = arr[right] * (right-left) * 10
//             right--
//         }
//         maxArea = curArea>maxArea?curArea:maxArea
//     }
//     return maxArea
// }

let arr = [12, 25, 43, 34, 23, 98, 84, 62, 91]
console.log(theMostWaterArea(arr))
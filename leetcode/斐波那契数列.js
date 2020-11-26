/** 
 斐波那契数，通常用  F(n) 表示，形成的序列称为斐波那契数列。该数列由  0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：
 
 F(0) = 0,   F(1) = 1
 
 F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
 
 给定  N，计算  F(N)。
 
 先大概预览一下斐波那契数列的样子：
 
 1、1、2、3、5、8、13、21、34
*/

let fibonaqi = function (n) {
    let arr = [0, 1]
    for (let i = 2; i < n; i++) {
        arr[i] = arr[i-1] + arr[i-2]
    }
    return arr[n]
}











// let fibonaqi = function(n){
//     let arr = []
//     arr[0] = 0
//     arr[1] = 1
//     for(let i = 2;i<=n;i++){
//         arr[i] = arr[i-1] + arr[i-2]
//     }
//     return arr[n]
// }
let startTime
let endTime
startTime = BigInt(Date.now())
console.log("startTime:" + Date.now())


let result = BigInt(fibonaqi(1000))



endTime = BigInt(Date.now())
console.log("endTime:" + Date.now())
console.log('result:fibonaqi(1000)=' + result)
console.log('耗时:' + (endTime - startTime))
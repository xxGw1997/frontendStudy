/**
  给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。

  输入: n = 12
  输出: 3 
  解释: 12 = 4 + 4 + 4.
 */

 function numSquares(n){
  let dp = []
  dp[0] = 0
  if(n === 0) return 0
  if(n<0) return '来点阳间的数字'
  let min = Infinity
  for(let i=1;i<=n;i++){
    let j = 1
    while(true){
      let prev = i - j * j
      if(prev<0) break
      min = Math.min(dp[prev]+1,min)
      j++
    }
    dp[i] = min
  }
  return dp[n]
 }
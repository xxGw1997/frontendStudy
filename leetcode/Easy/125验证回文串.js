/**
    给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

    说明：本题中，我们将空字符串定义为有效的回文串。

    示例 1:

    输入: "A man, a plan, a canal: Panama"
    输出: true
    示例 2:

    输入: "race a car"
    输出: false
 */

function isValid(c){
    const charCode = c.charCodeAt(0);
    const isDigit = charCode >= "0".charCodeAt(0) && charCode <= "9".charCodeAt(0);
    const isChar = charCode >= "a".charCodeAt(0) && charCode <= "z".charCodeAt(0);
    return isDigit || isChar;
}


let isPalindrome = function(s){
    s = s.toLowerCase()
    let left = 0
    let right = s.length -1

    while(left<right){
        if(!isValid(s[left])){
            left++
            continue
        }
        if(!isValid(s[right])){
            right--
            continue
        }
        if(s[left] === s[right]){
            left++
            right--
        }else{
            break
        }
    }
    return left>=right
}

console.log(isPalindrome('A man, a plan, a canal: Panama'))
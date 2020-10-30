/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
    有效字符串需满足：

    左括号必须用相同类型的右括号闭合。
    左括号必须以正确的顺序闭合。
    注意空字符串可被认为是有效字符串。

    示例 1:
    输入: "()"
    输出: true

    示例 2:
    输入: "()[]{}"
    输出: true

    示例 3:
    输入: "(]"
    输出: false

    示例 4:
    输入: "([)]"
    输出: false

    示例 5:
    输入: "{[]}"
    输出: true
 */

 let valid_kuohao = function(str){
    let arr = []
    if(arr.length%2 !== 0) return false
    let double = {
        "{":"}",
        "[":"]",
        "<":">",
        "(":")"
    }

    for(let i in str){
        const v = str[i]
        if(['{','[','<','('].indexOf(v) > -1){
            arr.push(v)
        }else{
            const left = arr.pop()
            if(v !== double[left]){
                return false
            }
        }
    }
    if(arr.length>0)return false
    return true
 }

 console.log(valid_kuohao('((<{()}>))'))
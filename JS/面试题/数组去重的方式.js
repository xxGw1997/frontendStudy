let arr = [1, 1, '1', '1', null, null, 
            undefined, undefined, 
            new String('1'), new String('1'), 
            /a/, /a/,
            NaN, NaN
            ];

//1、使用Set
let way_Set = [...new Set(arr)]
console.log('使用Set:',way_Set)

//2、使用filter
let way_Filter = arr.filter((e,i)=>{
    //只返回  第一次匹配到的元素的下标index 是否等于 正在遍历元素的下标i
    return arr.indexOf(e) === i
})
console.log('使用filter:',way_Filter)

//3、使用reduce
let way_reduce = arr.reduce((pre,cur)=>{
    return pre.includes(cur)?pre:[...pre,cur]
},[])
console.log('使用reduce:',way_reduce)
function unique(arr, isSorted, iteratee){
  let res = []
  let temp = []
  for (let i = 0; i < arr.length; i++) {
    let value = arr[i]
    // 对每个元素进行大小写之间的转换
    let computed = iteratee ? iteratee(value) : value
    // 如果是排序的
    if (isSorted) {
      if (!i || temp !== computed) {
        res.push(value)
      }
      temp = computed
    } else if(iteratee){  // 如果没排序，忽略大小写
      if (temp.indexOf(computed) === -1) {
        res.push(value)
        temp.push(computed)
      }
    } else if (res.indexOf(value) === -1) { // 正常排序
      res.push(value);
    } 
  }
  return res
}

let arr = [1, 1, '1', '1', 'a', 'A', null, null, undefined, undefined, /a/, /a/, NaN, NaN]
let result = unique(arr, true, function(value){
  return typeof value == 'string' ? value.toLowerCase() : value
})
console.log(result)    // [ 1, '1', 'a', null, undefined, /a/, /a/, NaN, NaN ]
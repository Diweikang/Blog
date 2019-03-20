function unique(array) {
  let res = []
  var sortedArray = array.concat().sort()
  let temp
  for (let i = 0; i < sortedArray.length; i++) {
      /* 
        如果是第一个元素或者相邻的元素不相同
        temp表示上一次存储的元素 
      */
      if (!i || temp !== sortedArray[i]) {
          res.push(sortedArray[i])
      }
      temp = sortedArray[i]
  }
  return res
}

let arr = [1, 1, '1', '1', null, null, undefined, undefined, {a: 'b'}, {a: 'b'}, /a/, /a/, NaN, NaN]
    let result = unique(arr)
    console.log(result)     // [ 1, '1', null, undefined, {a: 'b'}, {a: 'b'}, /a/, /a/] 
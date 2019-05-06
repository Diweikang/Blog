function unique(arr) {
  let res = []
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < res.length; j++) {
      if (res[j] === arr[i]) {
        break
      }
    }
    // 当都不相等，那么表示arr[i]在res中没出现过
    if (j === res.length) {
      res.push(arr[i])
    }
  }
  return res
}

let arr = [1, 1, '1', '1', null, null, undefined, undefined, {a: 'b'}, {a: 'b'}, /a/, /a/, NaN, NaN]
let result = unique(arr)
console.log(result)     // [ true, 1, 2, '1' ]
[ 1, '1', null, undefined, {a: 'b'}, {a: 'b'}, /a/, /a/, NaN, NaN ]
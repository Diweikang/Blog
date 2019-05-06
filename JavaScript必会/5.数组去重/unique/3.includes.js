function unique(arr) {
  let res = []
  for (var i = 0; i < arr.length; i++) {
    if (!res.includes(arr[i])) {
      res.push(arr[i])
    }
  }
  return res
}

let arr = [1, 1, '1', '1', null, null, undefined, undefined, {a: 'b'}, {a: 'b'}, /a/, /a/, NaN, NaN]
    let result = unique(arr)
    console.log(result)     // [ 1, '1', null, undefined, {a: 'b'}, {a: 'b'}, /a/, /a/, NaN, NaN ] 
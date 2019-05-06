function unique(arr, isSorted) {
  let res = []
  let temp
    for (let i = 0; i < arr.length; i++) {
      if (isSorted) {
        if (!i || temp !== arr[i]) {
          res.push(arr[i])
        }
        temp = arr[i]
      } else {
        if (res.indexOf(arr[i]) === -1) {
          res.push(arr[i])
        }
      }
    }
  return res
}

let arr = [1, 1, '1', '1', null, null, undefined, undefined, {a: 'b'}, {a: 'b'}, /a/, /a/, NaN, NaN]
let result = unique(arr, true)
console.log(result)     // [ 1, '1', null, undefined, { a: 'b' }, { a: 'b' }, /a/, /a/, NaN, NaN ]

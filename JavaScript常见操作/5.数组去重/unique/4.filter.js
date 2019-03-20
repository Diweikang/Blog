function unique(arr) {
  let res = arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
  return res
}

let arr = [1, 1, '1', '1', null, null, undefined, undefined, {a: 'b'}, {a: 'b'}, /a/, /a/, NaN, NaN]
    let result = unique(arr)
    console.log(result)     // [ 1, '1', null, undefined, {a: 'b'}, {a: 'b'}, /a/, /a/, NaN, NaN ] 
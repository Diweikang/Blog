function unique(arr) {
  return [...new Set(arr)]
}

let arr = [1, 1, '1', '1', null, null, undefined, undefined, {a: 'b'}, {a: 'b'}, /a/, /a/, NaN, NaN]
    let result = unique(arr)
    console.log(result)     // [ 1, '1', null, undefined, {a: 'b'}, {a: 'b'}, /a/, /a/, NaN ] 
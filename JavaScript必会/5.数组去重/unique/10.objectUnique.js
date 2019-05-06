/* function unique(arr){
  let obj = {}
  return arr.filter(item => {
    console.log(obj)
    return obj.hasOwnProperty(item) ? false : (obj[item] = 1)
  })
}

let arr = [1, 1, '1', '1', null, null, undefined, undefined, {a: 'b'}, {a: 'b'}, /a/, /a/, NaN, NaN]
let result = unique(arr, true)
console.log(result)   // [ 1, null, undefined, { a: 'b' }, /a/, NaN ] */


function unique(arr){
  let obj = {}
  return arr.filter(item => {
    return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = 1)
  })
}

let arr = [1, 1, '1', '1', null, null, undefined, undefined, {a: 1}, {a: 2}, /a/, /a/, NaN, NaN]
let result = unique(arr, true)
console.log(result)   // [ 1, '1', null, undefined, { a: 1 }, { a: 2 }, /a/, NaN ]
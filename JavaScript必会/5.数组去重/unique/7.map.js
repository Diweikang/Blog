function unique (arr) {
  let temp = new Map()
  return arr.filter((item) => !temp.has(item) && temp.set(item, 1))
}

let arr = [true, 1, 2, 2, '1', true]
let result = unique(arr)
console.log(result)     // [ true, 1, 2, '1' ]
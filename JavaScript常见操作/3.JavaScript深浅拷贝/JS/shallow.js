var shallowCopy = function(source) {
  if (typeof source !== 'object') {
    return
  }
  let target = source instanceof Array ? [] : {}
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = source[key]
    }
  }
  return target
}

var source = { a: 1, b: 2 }
// 返回一个拥有target属性的对象
var target = shallowCopy(source)
// var target = {...source}
console.log(source)  // { a: 1, b: 2}
console.log(target)  // { a: 1, b: 2}
// 修改a属性值，只有source变化，target并没有改变
target.a = 3
console.log(source)  // { a: 1, b: 2}
console.log(target)  // { a: 3, b: 2}
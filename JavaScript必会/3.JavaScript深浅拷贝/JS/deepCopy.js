var deepCopy = function(source) {
  if (typeof source !== 'object') {
    return
  }
  let target = source instanceof Array ? [] : {}
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = typeof source[key] === 'object' ? deepCopy(source[key]) : source[key]
    }
  }
  return target
}

var source = { a: {name: 'zhangsan'}}
var target = deepCopy(source)
target.a.name = 'lisi'
console.log(source)  // { a: {name: 'zhangsan'}}
console.log(target)  // { a: {name: 'lisi'}}
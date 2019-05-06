let arr = [1, [2, [3, 4]]]
// 当数组元素都是数字时可以使用toString()方法
function flatten(arr){
  return arr.toString().split(',').map(item => {
    // +将字符串转为数字
    return +item
  })
}
console.log(flatten(arr))
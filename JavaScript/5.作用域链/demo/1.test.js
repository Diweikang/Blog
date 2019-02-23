var a = 'outer'
function outer() {
  var b = 'outer-inner'
  function inner() {
    console.log(a)
  }
  inner()
}
outer()   // 打印结果是outer

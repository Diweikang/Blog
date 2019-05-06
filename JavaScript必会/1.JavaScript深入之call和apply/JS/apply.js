Function.prototype.applyLike = function(obj, arr) {
  if (typeof this !== "function") {
    throw new Error("调用call的对象不是函数");
  }
  obj = obj || window
  obj.fn = this
  let result
  if (!arr) {
    result = obj.fn()
  } else {
    let args = []
    for (let i = 0; i < arr.length; i++) {
      args.push(arr[i])
    }
    result = eval('obj.fn(' + args + ')')
    // result = obj.fn(...arr)
  }
  delete obj.fn
  return result
}

var obj = {
  num: 2
}
function foo(num1) {
  console.log(this.num)
  console.log(num1)
}
foo.applyLike(obj, [3]) //'2', '3'
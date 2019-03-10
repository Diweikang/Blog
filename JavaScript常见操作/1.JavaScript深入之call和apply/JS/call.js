Function.prototype.callLike = function(obj){
  if (typeof this !== "function") {
    throw new Error("调用call的对象不是函数");
  }
  obj = obj || window
  obj.fn = this
  let args = []
  /* for(let i = 1; i < arguments.length; i++){
    args.push(arguments[i])
  }
  let result = eval('obj.fn('+ args +')') */
  let result = obj.fn(...[...arguments].slice(1))
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
foo.callLike(obj, 3) //'2', '3'
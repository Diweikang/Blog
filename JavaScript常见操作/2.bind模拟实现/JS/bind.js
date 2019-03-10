Function.prototype.bindLike = function(obj){
  if (typeof this !== "function") {
    throw new Error("调用bind的对象不是函数");
  }
  let _this = this
  obj = obj || window
  let args = Array.prototype.slice.call(arguments, 1)
  let f = function(){
    // 函数会有执行结果
    let args1 = Array.prototype.slice.call(arguments)
    return _this.apply(this instanceof f ? this : obj, args.concat(args1))
  }
  f.prototype = Object.create(_this.prototype)
  return f
}

/* var obj = {
  num: 2
}
function foo(num1) {
  console.log(this.num)
  console.log(num1)
}
let res = foo.bindLike(obj, 3) 
res()           //'2', '3' */


var obj = {
  num: 2
}
function foo(num1) {
  this.num2 = 6
  console.log(num1)
  console.log(this.num)
}
let res = foo.bindLike(obj, 3) 
let instance = new res()    // 3, undefined  
console.log(instance.num2)  // 6
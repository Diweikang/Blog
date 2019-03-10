var num = 1
var obj = {
  num: 2
}

function foo(num1, num2) {
  console.log(this.num)
  console.log(num1)
  console.log(num2)
}

Function.prototype.callLike = function (context, ...params) {
  context = context || window
  context.fn = this
  // 获取传入的参数
  var args = [];
  // i从1开始，因为arguments的第一个参数是绑定的对象
  // ES5语法实现
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push(arguments[i]);
  }
  // 这样调用相当于把'3,4'字符串传给了方法，得到的结果不正确。
  // context.fn(args.join(','))

  // 使用eval调用函数，结果正确
  // eval('context.fn(' + args + ')');

  // ES6语法实现
  // context.fn(...params)
  delete context.fn
}
// 例1测试: 
foo.callLike(obj, 3, 4) // 2 3 4
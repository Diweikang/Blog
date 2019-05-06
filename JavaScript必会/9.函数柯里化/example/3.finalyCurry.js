function sub_Curry(fn){
  let args = [].slice.call(arguments, 1)
  return function() {
    return fn.apply(this, args.concat([].slice.call(arguments)))
  }
}

function curry(fn, length){
  length = length || fn.length
  let slice = Array.prototype.slice
  return function() {
    if (arguments.length < length) {
      let combined = [fn].concat(slice.call(arguments))
      return curry(sub_Curry.apply(this, combined), length - arguments.length)
    } else {
      return fn.apply(this, arguments)
    }
  }
}

var fn = curry(function(a, b, c) {
  return [a, b, c];
});

console.log(fn("a", "b", "c")) // ["a", "b", "c"]
console.log(fn("a", "b")("c")) // ["a", "b", "c"]
console.log(fn("a")("b")("c")) // ["a", "b", "c"]
console.log(fn("a")("b", "c")) // ["a", "b", "c"]
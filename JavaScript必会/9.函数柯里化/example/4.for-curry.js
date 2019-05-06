function curry(fn, args){
  let length = fn.length
  args = args || []
  return function() {
    let _args = args.concat([].slice.call(arguments))
    if (_args.length < length) {
      return curry.call(this, fn, _args)
    } else {
      return fn.apply(fn, _args)
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
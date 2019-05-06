function curry(fn){
  let args = [].slice.call(arguments, 1)
  return function() {
    let newArgs = args.concat([].slice.call(arguments))
    return fn.apply(this, newArgs)
  }
}

function add(a, b){
  return a + b
}

let addCurry = curry(add, 1, 2)
console.log(addCurry())

let addCurry1 = curry(add, 1)
console.log(addCurry1(2))

let addCurry2 = curry(add)
console.log(addCurry2(1, 2))
function red(){
  console.log('red')
}

function green(){
  console.log('green')
}

function yellow(){
  console.log('yellow')
}

function tic(cd, timer){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cd()
      resolve()
    }, timer)
  })
}

function *gen(){
  yield tic(red, 3000)
  yield tic(green, 2000)
  yield tic(yellow, 1000)
}
// 获取迭代器
let iterator = gen()

let step = function (iterator) {
  let next = iterator.next()
  if (next.done) {
    step(gen())
  } else {
    next.value.then(() => {
      step(iterator)
    })
  }
}
step(iterator)

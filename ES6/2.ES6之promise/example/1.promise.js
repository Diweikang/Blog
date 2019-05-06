/* 红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？（用Promse实现） */
function red(){
  console.log('red')
}
function green(){
  console.log('green')
}
function yellow(){
  console.log('yellow')
}

let tic = function(cb, timer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cb()
      resolve()
    }, timer)
  })
}

let p = new Promise((resolve, reject) =>{
  resolve()
})

let step = function (def) {
  def.then(() => {
    return tic(red, 3000)
  }).then(() => {
    return tic(green, 2000)
  }).then(() => {
    return tic(yellow, 1000)
  }).then(() =>{
    step(def)
  })
}

step(p)


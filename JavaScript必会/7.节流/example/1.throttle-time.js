let count = 0
let container = document.querySelector('.container')
let btn = document.querySelector('button')

function changeDivText () {
  container.innerText = count++
}

function throttle(func, wait) {
  let _this, args
  let previous = 0
  return function() {
    let now = new Date()
    _this = this
    args = arguments
    if (now - previous > wait) {
      func.apply(_this, args)
      previous = now
    }
  }
}

btn.onclick = throttle(changeDivText, 1000)
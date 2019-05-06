let count = 0
let container = document.querySelector('.container')
let btn = document.querySelector('.test')

function changeDivText() {
  container.innerHTML = count++
}

function throttle(func, wait) {
  let timer, _this, args
  return function(params) {
    _this = this
    args = arguments
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(_this, args)
        clearTimeout(timer)
        timer = null
      }, wait)
    }
  }
}

btn.onclick = throttle(changeDivText, 1000)
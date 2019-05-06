let count = 0
let container = document.querySelector('.container')
let btn = document.querySelector('button')

function changeDivText () {
  container.innerHTML = count++
}

function debounce(func, wait, immediate){
  let timer, result
  return function () {
    let _this = this
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      if (!timer) {
        result = func.apply(_this, args)
      }
      timer = setTimeout(() => {
        timer = null
      }, wait)
    } else {
      timer = setTimeout(() => {
        func.apply(_this, args)
      }, wait)
    }
    return result
  }
}

btn.onclick = debounce(changeDivText, 1000, true)
let count = 0
let container = document.querySelector('.container')
let btn = document.querySelector('button')

function changeDivText() {
  container.innerHTML = count++
  console.log(this)
}

function debounce(func, wait) {
  let timer
  return function() {
    let _this = this
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.call(_this)
    }, wait)
  }
}

btn.onclick = debounce(changeDivText, 1000)
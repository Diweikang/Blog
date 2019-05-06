let count = 0
let container = document.querySelector('.container')
let btn = document.querySelector('button')

function changeDivText() {
  container.innerHTML = count++
}

function debounce(func, wait) {
  let timer
  return function(params) {
    if (timer){
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func()
    }, wait)
  }
}

btn.onclick = debounce(changeDivText, 1000)
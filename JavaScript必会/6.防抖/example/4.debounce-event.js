let count = 0
let container = document.querySelector('.container')
let btn = document.querySelector('button')

function changeDivText (e) {
  container.innerHTML = count++
}

function debounce(func, wait){
  let timer
  return function () { 
    let _this = this
    let args = arguments
    timer = setTimeout(() => {
      if (timer) {
        clearTimeout(timer)
      }
      func.apply(_this, args)
    }, wait)
   }
}

btn.onclick = debounce(changeDivText, 1000)
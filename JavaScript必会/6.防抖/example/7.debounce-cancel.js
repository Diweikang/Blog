let count = 0
let container = document.querySelector('.container')
let test = document.querySelector('.test')
let cancle = document.querySelector('.cancle')

function changeDivText(){
  container.innerHTML = count++
}

function debounce(func, wait, immediate){
  let timer, result
  let debounced =  function() {
    let _this = this
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      if (!timer){
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
  }
  debounced.cancel = function() {
    clearTimeout(timer)
    timer = null
  }
  return debounced
}

let changeDivText1 = debounce(changeDivText, 10000, true)
test.onclick = changeDivText1

cancle.onclick = changeDivText1.cancel

/* 引出问题：clearTimeout()和timer = null有何区别？ */
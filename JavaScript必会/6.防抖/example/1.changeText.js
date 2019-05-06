let count = 0
let container = document.querySelector('.container')
let btn = document.querySelector('button')

function changeDivText () {
  container.innerText = count++
}

btn.onclick = changeDivText
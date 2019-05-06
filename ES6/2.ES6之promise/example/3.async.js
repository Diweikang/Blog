function red(){
  console.log('red')
}
function green(){
  console.log('green')
}
function yellow(){
  console.log('yellow')
}

function tic(cb, timer){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cb()
      resolve()
    }, timer)
  })
}

async function loop(){
　　await tic(red, 3000);
  await tic(green, 2000);
  await tic(yellow, 1000);
  await loop();
}
  loop();　　　　
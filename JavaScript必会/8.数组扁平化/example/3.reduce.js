let arr = [1, [2, [3, 4]]]
function flatten(arr){
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flatten(next) : next) 
  }, [])
}

console.log(flatten(arr))
let container = document.querySelector('#container')
let btn = document.querySelector('#button')

let obj = {
  value: 1
}

function watch(obj, key, func){
  let value = obj[key]
  Object.defineProperty(obj, "value", {
    get: function() {
      return value
    },
    set: function(newValue) {
      value = newValue
      func(value)
    }
  })
  if (value) obj[name] = value
}


watch(obj, 'value', function(newValue) {
  container.innerHTML = newValue
})

btn.onclick = function() {
  obj.value += 1
}

var proxy = new Proxy({}, {
  get: function(obj, prop) {
    console.log('進行了get操作')
    return obj[prop]
  },
  set: function(obj, prop, value) {
    console.log('進行了set操作')
    obj[prop] = value
  }
})

proxy.time = 35
console.log(proxy.time)
function watch(target, func){
  let proxy = new Proxy(target, {
    get: function(target, prop) {
      return target[prop]
    },
    set: function(target, prop, value) {
      target[prop] = value
      func(prop, value)
    }
  })
  return proxy
}
var handler = {
  has: function(target, prop) {
    if (prop[0] === '_'){
      return false
    }
    return prop in target
  }
}

var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
console.log('_prop' in proxy); // false
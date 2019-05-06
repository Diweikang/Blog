(function(global){
  function Set(data){
    this._values = []
    this.size = 0

    data && data.forEach(item => {
      this.add(item)
    }, this)
  }

  // add方法可以链式调用，执行完返回的依然是set对象
  Set.prototype['add'] = function(value) {
    if (this._values.indexOf(value) === -1) {
      this._values.push(value)
      ++this.size
    }
    return this
  }

  // delete返回的是布尔值，表示删除是否成功
  Set.prototype['delete'] = function(value) {
    let index = this._values.indexOf(value)
    console.log(index)
    if (index === -1) {
      return false
    } else {
      this._values.splice(index, 1)
      --this.size
      return true
    }
  }

  // 判断元素是否存在，返回的是布尔值
  Set.prototype['has'] = function(value) {
    return this._values.indexOf(value) !== -1
  }

  // 清空整个set
  Set.prototype['clear'] = function(value) {
    this._values = []
    this.size = 0
  }

  // 清空整个set
  Set.prototype['forEach'] = function(cb, thisArg) {
    thisArg = thisArg || this
    for (let i = 0; i < this._values.length; i++) {
      cb.call(thisArg, this._values[i], this._values[i], this)
    }
  }
})(this)


let set = new Set([1, 2, 3, 4, 4]);

set.delete(1);
console.log(set.has(1)); // false

set.clear();
console.log(set.size); // 0

set = new Set([1, 2, 3, 4, 4]);
set.forEach((value, key, set) => {
	console.log(value, key, set.size)
})
// 1 1 4
// 2 2 4
// 3 3 4
// 4 4 4
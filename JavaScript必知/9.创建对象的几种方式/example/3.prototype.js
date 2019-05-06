// 原型模式第一版
function Person(){
}
Person.prototype.name = 'kevin'
Person.prototype.getName = function() {
  console.log(this.name)
}

let person1 = new Person()
person1.getName()
/* 优点：方法不会重新创建
缺点：1. 所有的属性和方法都共享 2. 不能初始化参数 */

// 原型模式优化
function Person(name){
  this.name = name
}
Person.prototype = {
  name: this.name,
  getName: function() {
    console.log(this.name)
  }
}
let person = new Person('kevin')
person.getName()
// 缺点：重写了原型，丢失了constructor属性


// 原型模式优化
function Person(name){
  this.name = name
}
Person.prototype = {
  constructor: Person,
  name: this.name,
  getName: function() {
    console.log(this.name)
  }
}
let person = new Person('kevin')
person.getName()

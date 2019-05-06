function createPerson (name) {
  let o = new Object()
  o.name = name
  o.getName = function() {
    return this.name
  }
  return o
}

let person1 = createPerson('kevin')

// 缺点：所有对象都是Object()的实例，无法识别类别

function Person(name) {

  var o = new Object();
  o.name = name;
  o.getName = function () {
      console.log(this.name);
  };

  return o;
}
var person1 = new Person('kevin');
console.log(person1 instanceof Person) // false
console.log(person1 instanceof Object)  // true
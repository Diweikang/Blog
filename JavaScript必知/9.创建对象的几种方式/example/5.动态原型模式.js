function Person(name) {
  this.name = name;
  if (typeof this.getName != "function") {
    Person.prototype.getName = function () {
      console.log(this.name)
    }
  }
}

var person1 = new Person('kevin');
var person2 = new Person('daisy');

// 报错 并没有该方法
person1.getName();

// 注释掉上面的代码，这句是可以执行的。
person2.getName();
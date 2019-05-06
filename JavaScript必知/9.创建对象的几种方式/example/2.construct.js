// 构造模式第一种方式
function Person(name){
  this.name = name
  this.getName = function () {
    console.log(this.name)
  }
}
let person1 = new Person('kevin')
// person1.getName()

/* 优点：实例可以识别为一个特定的类型
缺点：每次创建实例时，每个方法都要被创建一次 */


// 构造模式优化
function Person(name){
  this.name = name
  this.getName = getName
}

function getName(){
  console.log(this.name)
}

person1.getName()
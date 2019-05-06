function Person(name){
  this.name = name
}

Person.prototype = {
  constructor: Person,
  getName: function() {
    console.log(this.name)
  }
}
let person = new Person('kevin')
person.getName()
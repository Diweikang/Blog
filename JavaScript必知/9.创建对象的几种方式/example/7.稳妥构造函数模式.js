function person(name){
  var o = new Object();
  o.sayName = function(){
      console.log(name);
  };
  return o;
}

var person1 = person('kevin');

person1.sayName(); // kevin

person1.name = "daisy";

person1.sayName(); // kevin

console.log(person1.name); // daisy
# 深入理解JavaScript之this
## this
  在之前的<<执行上下文与执行上下文栈>>中说到，JavaScript遇到可执行代码时会创建执行上下文，执行上下文有'变量对象'、'作用域链'、'this'属性：
  ```js
    context: {
      VO: {},
      Scope: [],
      this: reference to thisValue
    }
  ```
  this作为执行上下文的一个属性，和上下文类型有关，它在进入上下文时创建，运行上下文期间指向不发生改变。

## this的真正指向
  函数调用时会创建对应的函数执行上下文，上下文的属性this也就确定了，但是每次函数调用方式如果不一样，就会导致每次this有可能也不同，**通常情况**下this的指向是调用它的那个对象。

### 函数的普通调用
  例1：首先讨论函数最普通的调用:
  ```js
    var name = '妖孽'
    function foo() {
      var name = '熏悟空'
      console.log(this) //'window'
      console.log(this.name)  //'妖孽'
    }
    foo()
  ```
  上例中的foo函数其实会作为window的属性被调用，其中的this就指向了window对象，window.name的值也就是'妖孽'。

### 函数作为对象属性
  例2：直接作为对象属性调用
  ```js
    var name = '妖孽'
    var person = {
      name: '熏悟空',
      foo: function() {
        console.log(this) //'preson'
        console.log(this.name)  //'熏悟空'
      }
    }
    person.foo()
  ```
  这里的foo作为person对心的属性被调用，其中的this就指向了persons对象，person.name的值也就是'熏悟空'。

  例3：对象属性赋值给变量再调用
  ```js
    var name = '妖孽'
    var person = {
      name: '熏悟空',
      foo: function() {
        console.log(this) //'window'
        console.log(this.name)  //'妖孽'
      }
    }
    var f = person.foo
    f()
  ```
  这里的先将person.foo函数赋值给变量f，再调用f函数，此时f作为window的属性被调用，this就指向了window，那么this.name就是妖孽。

### 函数作为构造函数调用

  例4：作为构造函数使用
  ```js
    function Person(name, age) {
      this.name = name
      this.age = age
    }
    var p = new Person('史上飞', '27')
    console.log(p.name)   //'史上飞'
  ```
  构造函数的执行过程，首先创建一个空对象p，**改变函数中的this指向新建对象p**，然后再执行函数Person，然后p就拥有name和age两个属性并且赋值'史上飞','26'。

  例5：构造函数return对象
  ```js
    function Person(name, age) {
      this.name = name
      this.age = age
      return {}
    }
    var p = new Person('史上飞', '27')
    console.log(p.name)   //undefined
  ```
  如果构造函数返回对象类型，最终this就指向返回的对象，不会再指向新建实例本身，这里由于p对象没有name属性，最后结果输出undefined。
### 函数显示绑定call/apply/bind
  JavaScript中call/apply/bind可以手动设置this的值。
  1. call设置this

    例6：参数为参数列表形式
  ```js
    var num = 3
    var obj1 = {
      num: 1,
      foo: function(num1, num2){
        console.log(this.num)
        console.log(this.num + (num1 || 0) + (num2 || 0))
      } 
    }
    var obj2 = {
      num: 2
    }
    obj1.foo.call() //'3', '3'
    obj1.foo.call(obj2) //'2', '2'
    obj1.foo.call(obj2, 1, 2) //'2', '5'
  ```
    1.1 obj1.foo.call()当不指定绑定的对象或指定null/undefined，默认this指向window，此时num值为3。
    1.2 obj1.foo.call(obj2)指定obj2调用foo方法，此时this指向obj2对象，obj2中的num为2。
    1.3 obj1.foo.call(obj2, 1, 2)，obj2调用foo方法的同时，传入参数，参数形式是参数列表，1,2分别赋值给num1和num2。
  2. apply设置this

  例7：参数为数组格式
  ```js
    var num = 3
    var obj1 = {
      num: 1,
      foo: function(num1, num2){
        console.log(this.num)
        console.log(this.num + (num1 || 0) + (num2 || 0))
      } 
    }
    var obj2 = {
      num: 2
    }
    obj1.foo.apply() //'3', '3'
    obj1.foo.apply(obj2) //'2', '2'
    obj1.foo.apply(obj2, [1, 2]) //'2', '5'
  ```
    2.1 obj1.foo.apply()当不指定绑定的对象或指定null/undefined，默认this指向window，此时num值为3。
    2.2 obj1.foo.apply(obj2)指定obj2调用foo方法，此时this指向obj2对象，obj2中的num为2。
    2.3 obj1.foo.apply(obj2, [1, 2])，obj2调用foo方法的同时，传入参数，参数形式是数组，1,2元素赋值给num1和num2。

  3. bind设置this

  例8：bind一层
  ```js
    var num = 3
    var obj1 = {
      num: 1,
      foo: function(num1, num2){
        console.log(this.num)
        console.log(this.num + (num1 || 0) + (num2 || 0))
      } 
    }
    var obj2 = {
      num: 2
    }
    var foo1 = obj1.foo.bind()
    foo1()  //'3', '3'
    var foo2 = obj1.foo.bind(obj2)
    foo2()  //'2', '2'
    var foo3 = obj1.foo.bind(obj2, 1, 2)
    foo3()  //'2', '5'
  ```
    3.1 obj1.foo.bind()当不指定绑定的对象或指定null/undefined，默认this指向window，返回函数foo1，调用foo1时num值为3。
    3.2 obj1.foo.bind(obj2)指定obj2调用foo方法，此时this指向obj2对象，返回函数foo1，调用foo1时num值为2。
    3.3 obj1.foo.apply(obj2, [1, 2])，obj2调用foo方法的同时，传入参数，参数形式是参数列表，1,2元素赋值给num1和num2，同时返回函数foo3，调用foo1时num值为2。

  例8：多次bind
  ```js
    var a = {}
    var fn = function() {
      console.log(this)
    }
    fn.bind().bind(a)()   //window

    // 代码等价于
    fn.bind().bind(a)()等价于

    var fn2 = function(){
      return function(){
        return fn.apply()
      }.apply(a)
    }
    fn2()
  ```
    不管我们给函数bind几次，fn中的this始终由第一次bind决定，所以结果永远是window。
  4. 总结

    4.1 call/apply异同
      相同点：
        4.1.1 都可以手动设置this的指向
        4.1.2 都会立即执行调用的函数
      不同点：
        4.1.3 call接受的参数是参数列表的形式
        4.1.4 apply接受的参数是数组的形式。
    4.2 call/apply和bind异同
      相同点：
        4.1.1 都可以手动设置this的指向
        4.1.2 call和bind接受的参数形式都是参数列表。
      不同点：
        4.1.3 bind返回函数，而不会立即执行函数。
        4.1.4 apply接受参数形式是数组，bind接受参数是参数列表。。
### ES6中的箭头函数
  例9：箭头函数
  ```js
    function a() {
      return () => {
        return () => {
          console.log(this)
        }
      }
    }
    console.log(a()()())  // window
  ```
  箭头函数本身是没有this的，箭头函数中的this只取决于包裹箭头函数的**第一个普通函数的this**，上例中包裹箭头函数的第一个普通函数调用时，this指向window。

## 总结
  本文主要通过函数常见的调用场景，分析不同场景下this的指向，功力不足没有从更深层次深挖为什么this最后的指向是这样，本文如果有任何不妥之处，多多指教。

## 推荐
  功力深厚的同学建议读读讶羽大大和汤姆大叔的这两篇文章，都有从ECMAScript规范角度解释为什么this指向的原理。

  [深入理解JavaScript系列（13）：This? Yes,this!](http://www.cnblogs.com/TomXu/archive/2012/01/17/2310479.html)
  [JavaScript深入之从ECMAScript规范解读this](https://github.com/mqyqingfeng/Blog/issues/7)
# 深入理解JavaScript之变量对象
在上一篇'执行上下文/栈'中提到'执行上下文'更像是一个拥有(变量对象、作用域链、this)的对象，对于文中的例子我们仅仅从'执行上下文栈'的角度分析了代码的执行过程，这节我们将学习'变量对象'的概念，从变量、函数的具体变化分析代码的执行过程。

## 变量对象
  变量对象(Variable Object：VO)是作为执行上下文属性的一个特殊对象，存储了在执行上下文中声明的：
    变量: var声明的变量，
    函数声明: 不包含函数表达式，
    函数形参。

  我们可以用普通对象模拟VO: 
  ```js
  VO = {}
  ```
  变量对象是执行上下文的一个属性：
  ```js
  EC = {
    // 变量对象
    VO = {}
  }
  ```
## 不同执行上下文中的变量对象
不同执行上下文中的变量对象有所不同，接下来主要学习下全局上下文和函数上下文中的变量对象。

### 全局上下文中的变量对象
全局对象(Global object)： 是在进入任何执行上下文前就已经创建了的对象，这个对象只存在一份，它的属性在程序中任何地方都可以访问，全局对象的生命周期终止于程序运行结束那一刻。

全局对象(global)预定义了一大堆函数和属性(Math、String、Date、parseInt等)作为自身属性，可以作为全局函数/变量的宿主，同时可以通过全局上下文的this访问全局对象，也可以通过其属性(客户端的window)指向到全局对象自身。

举例解释：

1.预定义了一大堆函数和属性。
```js
  console.log(String(10)) // 打印结果为'10'
  console.log(Math.random())  // 打印结果为0.9174627932559096
  console.log(parseInt(1.9))  // 打印结果为1
```
2.通过this访问全局对象。
```js
  this.a = 10
  console.log(this.a) // 打印结果为'10'
```
3.作为全局变量/函数的宿主。
```js
  var a = 10;
  console.log(this.a) // 打印结果为'10'
  function test(){
    console.log('****')
  }
  console.log(this.test)  // 打印结果为test函数本身
```
4.客户端 JavaScript 中，全局对象有 window 属性指向自身。
```js
  var a = 10
  console.log(window.a) // 打印结果为10
```
总结：对于全局上下文而言，在全局上下文中**变量对象**就是**全局对象**。

### 函数上下文中的变量对象
其实执行上下文的代码会分为两个阶段处理：
  1. 进入执行上下文
  2. 执行代码
  
活动对象(activation object,AO)：变量对象是规范中抽象的概念，进入执行上下文前，变量对象(VO)中的属性都不能访问，一旦进入执行阶段之后，变量对象(VO)会被激活为活动对象(AO)，拥有的属性也能被访问，它们其实是同一个对象，只是处于执行上下文的不同阶段。

在函数上下文中我们用**活动对象**表示**变量对象**。

活动对象(AO)在进入函数上下文时被创建，它通过函数的arguments属性初始化。arguments属性的值就是Arguments对象：

### 上下文执行过程分析

#### 进入执行上下文
当进入执行上下文时，这时代码还没执行，

变量对象属性包含：

1. 函数形参 (针对函数上下文)
    * 由名称和对应值组成，如果没传入实参，对应值为undefined

2. 函数声明(FunctionDeclaration, FD)
    * 由名称和对应值（函数对象(function-object)）组成，如果已存在相同名称的属性，则会被覆盖。

3. 变量声明(var, VariableDeclaration)
    * 由名称和对应值（undefined）组成，如果变量名跟已声明的形参或函数相同，则变量声明不会干扰已经存在的这类属性

  举例1：
  ```js
    function fun(a) {
      var b = 2;
      function c() {}
      var d = function() {}
      b = 3
    }
    fun(1)
  ```
  在进入执行上下文后，这时候的 AO 是：
  ```js
    AO = {
      // arguments对象初始化
      arguments: {
          0: 1,
          length: 1,
          callee: reference to function fun(){}
      },
      // 函数形参部分，有实参(1)传入
      a: 1,
      // var变量声明
      b: undefined,
      // 函数c声明
      c: reference to function c(){},
      // var变量声明
      d: undefined
    }
  ```
#### 执行代码
当进入执行上下文完成活动对象的初始化之后，开始执行代码，会修改其中变量的值，对应的活动对象的值也会改变。

代码执行后对应的AO：
  ```js
    AO = {
      // arguments对象初始化
      arguments: {
          0: 1,
          length: 1,
          callee: reference to function fun(){}
      },
      // 函数形参部分，有实参(1)传入
      a: 1,
      // 变量完成赋值
      b: 3,
      c: reference to function c(){},
      // 赋值d函数的引用
      d: reference to FunctionExpression "d"
    }
  ```
  通过以上对全局上下文和函数上下文中变量对象的学习，我们总结：
  1. 全局上下文的变量对象初始化是**全局对象**
  2. 函数上下文的变量对象初始化是**Arguments对象**
  3. 进入执行上下文会给变量对象添加形参、函数声明、变量声明等属性
  4. 执行阶段，会再次修改变量对象的属性值
  
### 参考
[深入理解JavaScript系列（12）：变量对象（Variable Object）](http://www.cnblogs.com/TomXu/archive/2012/01/16/2309728.html)

[JavaScript深入之变量对象 ](https://github.com/mqyqingfeng/Blog/issues/5)

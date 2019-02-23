# 深入理解JavaScript之作用域链
  在<<执行上下文与执行上下文栈>>一文中，我们提到执行上下文更像是一个对象，拥有变量对象、作用域链、this等属性，上一篇学习了变量对象对变量(var变量、函数声明、函数形参)的管理，但是代码运行过程中变量的查找规则又是交由谁负责管理的呢？，这就引入了这篇的主题**作用域链**。

  例1：
  ```js
  var a = 'outer'
  function outer() {
    var b = 'outer-inner'
    function inner() {
      console.log(a)
    }
    inner()
  }
  outer()   // 打印结果是outer
  ```
  大家都知道上面代码打印结果是'outer'，当代码执行到函数inner时，在当前的执行上下文的变量对象查找变量a无果，便继续在上一层级outer函数执行上下文的变量对象上查找，还是没有查到便会继续在上层查找，直到在全局执行上下文的变量对象中找到变量a打印输出结果，代码运行结束。

## 作用域链
  例1中，会先从当前(inner)上下文的变量对象中查找a变量，如果没有找到，就会从父级(outer)执行上下文的变量对象中查找，直到全局上下文的变量对象。这样由多个执行上下文的变量对象构成的链表就叫做**作用域链**。

## 函数生命周期
  函数的声明周期分为两个阶段：函数创建、函数激活。
  变量查找往往涉及到内部函数，我们通过分析函数生命周期的不同阶段学习作用域链。

### 函数创建
  要讲到作用域链，我们还需要学习下函数的内部属性[[scope]]，在函数创建的时候，[[scope]]属性会保存所有父层级的变量对象，可以理解[[scope]]是所有父变量对象的层级链。

  例1中各函数的[[scope]]：
  ```js
    // outer函数的[[scope]]属性
    outer.[[scope]] = [
      globalContext.VO
    ]
    // inner函数的[[scope]]属性
    inner.[[scope]] = [
      outerContext.AO,
      globalContext.VO
    ]
  ```
  注意：在**函数创建**时，它的属性[[scope]]才会存储父变量对象。
### 函数激活 
函数真正调用时，会创建函数执行上下文，我们类比函数执行上下文为一个对象，拥有变量对象、作用域链、this属性。
```js
  context: {
    VO: {}, // 变量对象
    Scope: [],  // 作用域链
    this    // this指向
  }
```
函数执行上下文的Scope属性会先赋值函数内部属性[[scope]]，然后再将自身的变量对象添加到上下文Scope的顶端。
```js
  context: {
    VO: {}, // 变量对象
    Scope: [VO].concat([[scope]]),  // 作用域链
    this    // this指向
  }
```
**注意**：[[scope]]是函数的自身的属性，而Scope是执行上下文的属性，两者不要混淆。
### 例1重新分析
我们重新完整的分析开头第一个例子

例2：
  ```js
  var a = 'outer'
  function outer() {
    var b = 'outer-inner'
    function inner() {
      console.log(a)
    }
    inner()
  }
  outer()   // 打印结果是outer
  ```
  1. outer函数创建，函数[[scope]]赋值：
    ```js
      // outer函数的[[scope]]属性
      outer.[[scope]] = [
        globalContext.VO
      ]
    ```
  2. outer函数调用，创建函数执行上下文，并且压栈
    ```js
      EcStack = [
        outerContext, // 函数执行上下文创建并压入指向上下文栈
        globalContext
      ]
    ```
    此时inner函数创建，函数[[scope]]赋值：
    ```js
      // inner函数的[[scope]]属性
      inner.[[scope]] = [
        outerContext.AO,
        globalContext.VO
      ]
    ```
  3. outer函数上下文Scope属性赋值
    ```js
      outerContext = [
        Scope: outer.[[scope]]  //Scope赋值outer函数的[[scope]]属性
      ]
    ```
  4. 进入outer执行上下文，活动对象创建并初始化
    ```js
      outerContext = [
        AO: {
          arguments: {
            length: 0,
            callee: reference to outerFunction
          },
          b: undefined,
          inner: reference to innerFunction
        },
        Scope: outer.[[scope]]
      ]
    ```
  5. outer活动对象添加到outer作用域链的顶端
    ```js
      outerContext = [
        AO: {
          arguments: {
            length: 0,
            callee: reference to outerFunction
          },
          b: undefined,
          inner: reference to innerFunction
        },
        Scope: [AO, Scope]
      ]
    ```
  6. outer函数执行代码，活动对象修改
    ```js
      outerContext = [
        AO: {
          arguments: {
            length: 0,
            callee: reference to outerFunction
          },
          b: 'outer-inner',
          inner: reference to innerFunction
        },
        Scope: [AO, Scope]
      ]
    ```
    inner函数调用,创建函数执行上下文，并且压栈
    ```js
      EcStack = [
        innerContext, // 函数执行上下文创建并压入指向上下文栈
        outerContext,
        globalContext
      ]
    ```
  7. inner函数上下文Scope属性赋值
    ```js
      innerContext = [
        Scope: inner.[[scope]]  //Scope赋值inner函数的[[scope]]属性
      ]
    ```
  8. 进入inner执行上下文，活动对象创建并初始化
    ```js
      innerContext = [
        AO: {
          arguments: {
            length: 0,
            callee: reference to outerFunction
          }
        },
        Scope: inner.[[scope]]
      ]
    ```
  9. inner活动对象添加到inner作用域链的顶端
    ```js
      innerContext = [
        AO: {
          arguments: {
            length: 0,
            callee: reference to outerFunction
          }
        },
        Scope: [AO, Scope]
      ]
    ```
  10. inner函数执行代码，打印输出变量a值，inner执行上下文的作用域链中保存了inner、outer、global执行上下文的变量对象，先在inner变量对象中找不到变量a，再去outer的变量对象中查找也未找到，最后在global变量对象中找到变量a，然后打印输出。

  11. inner函数执行结束，inner函数执行上下文弹栈。
    ```js
      EcStack = [
        outerContext,
        globalContext
      ]
    ```
  12. outer函数执行结束，outer函数执行上下文弹栈。
    ```js
      EcStack = [
        globalContext
      ]
    ```
  总结：本篇我们通过示例分析，阐述了什么是作用域链，以及代码执行过程中作用域链的变化过程，如果本篇有任何的不妥之处，希望大家能够指正。
### 参考
[深入理解JavaScript系列（14）：作用域链(Scope Chain)](http://www.cnblogs.com/TomXu/archive/2012/01/18/2312463.html)

[JavaScript深入之作用域链](https://github.com/mqyqingfeng/Blog/issues/6)

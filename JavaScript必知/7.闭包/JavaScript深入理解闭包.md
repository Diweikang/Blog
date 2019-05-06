# 深入理解JavaScript之闭包
  网上看到很多对闭包的解释是'能够读取其他函数内部变量的函数'，直到学习到汤姆大叔写的关于闭包的文章，才觉得这个解释定义有些不够严谨，上面的解释只能说是闭包的一种体现。

  这篇文章中对闭包的解释涉及到前面几篇提到的执行上下文/执行上下文栈、作用域链、变量对象这些概念，不熟悉的可以先了解下。

## 何为闭包
  <<JavaScript权威指南>>：从技术角度讲，所有的JavaScript**函数**都是闭包。

  汤姆大叔关于闭包一文中写到：
  ```
    ECMAScript中，闭包指的是：

    1. 理论角度：所有的函数。因为函数在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。
    2. 实践角度：以下函数才算是闭包：
      2.1 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
      2.2 在代码中引用了自由变量
  ```
  自由变量：自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。

  我们平常谈到的闭包更多指的是实践上的闭包。

## 实例分析
  ### 理论角度 -- 函数就是闭包
  ```js
  例1：普通函数
    var x = 10;
    function foo() {
        console.log(x);   // 打印结果10
    }
    foo();
  ```
    1. 函数foo创建的时候，就将全局上下文的**变量对象**存在自身的作用域链上，如果变量在当前上下文中找不到，就会顺着作用域链向上查找。
    2. 这里的x既不是foo的参数也不是foo的局部变量，那么x就是自由变量。
    从理论的角度来讲此时的foo就是闭包。
  
  ### 实践角度 -- 满足一定条件的函数
  使用"执行上下文"一篇中的示例
  ```js
  例2：函数作为返回值
    var scope = "global scope"
    function checkscope(){
        var scope = "local scope"
        return function f(){
            return scope
        }
    }
    checkscope()()  // 执行结果是"local scope"
  ```
  我们都知道上例的执行结果是"local scope"，我们分析下执行过程。
  1. checkscope函数创建，函数的[[scope]]属性赋值：
  ```js
    //checkscope函数的[[scope]]属性
    checkscope.[[scope]] = [
      globalContext.VO
    ]
  ```
  2. checkscope函数调用，创建函数执行上下文，并且压栈
  ```js
    EcStack = [
      checkscopeContext, // 函数执行上下文创建并压入指向上下文栈
      globalContext
    ]
  ```
  3. checkscope函数上下文Scope属性赋值
  ```js
    outerContext = [
      Scope: checkscope.[[scope]]  //Scope赋值checkscope函数的[[scope]]属性
    ]
  ```
  4. 进入checkscope执行上下文，活动对象创建并初始化
  ```js
    checkscopeContext = [
      AO: {
        arguments: {
          length: 0,
          callee: reference to checkscopeFunction
        },
        scope: undefined
      },
      Scope: checkscope.[[scope]]
    ]
  ```
  5. checkscope活动对象添加到checkscope作用域链的顶端
  ```js
    checkscopeContext = [
      AO: {
        arguments: {
          length: 0,
          callee: reference to checkscopeFunction
        },
        scope: undefined
      },
      Scope: [AO, globalContext.VO]
    ]
  ```
  6. checkscope函数执行代码，活动对象修改
  ```js
    checkscopeContext = [
      AO: {
        arguments: {
          length: 0,
          callee: reference to checkscopeFunction
        },
        scope: 'local scope'
      },
      Scope: [AO, globalContext.VO]
    ]
  ```
  此时f函数创建，函数的[[scope]]属性赋值：
  ```js
    // f函数的[[scope]]属性
    f.[[scope]] = [
      checkscopeContext.AO,
      globalContext.VO
    ]
  ```
  7. checkscope函数执行结束，checkscope函数执行上下文弹栈。
  ```js
    EcStack = [
      globalContext
    ]
  ```
  8. 返回的函数f调用，创建函数执行上下文，并且压栈
  ```js
    EcStack = [
      fContext,
      globalContext
    ]
  ```
  9. f函数上下文Scope属性赋值
  ```js
    fContext = [
      Scope: f.[[scope]]  //Scope赋值f函数的[[scope]]属性
    ]
  ```
  10. 进入f执行上下文，活动对象创建并初始化
  ```js
    fContext = [
      AO: {
        arguments: {
          length: 0,
          callee: reference to fFunction
        }
      },
      Scope: f.[[scope]]
    ]
  ```
  11. f活动对象添加到f作用域链的顶端
  ```js
    fContext = [
      AO: {
        arguments: {
          length: 0,
          callee: reference to fFunction
        }
      },
      Scope: [AO, checkscopeContext.AO, globalContext.VO]
    ]
  ```
  12. f函数执行代码，打印输出变量scope值，f执行上下文的作用域链中保存了f、checkscope、global执行上下文的变量对象，先在f变量对象中找不到变量scope，再去checkscope的变量对象中查找，找到了就打印输出。
  13. f函数执行结束，f函数执行上下文弹栈。
  ```js
    EcStack = [
      globalContext
    ]
  ```
  上例中虽然在第7步checkScope函数执行结束并且弹栈，但是f函数的[[socpe]]属性中一直存着checkScope上下文的**变量对象**，这里是返回的函数能读取checkScope函数内部scope变量的关键。

## 总结
  这节从两种角度分析了下闭包，重点分析了实践中的闭包，通过函数的执行过程分析闭包的形成原因，如果大家以后再遇到闭包类的面试题就可以从这个角度分析。文章中如果有任何不妥之处，请指正。

### 参考
[深入理解JavaScript系列（16）：闭包（Closures）](http://www.cnblogs.com/TomXu/archive/2012/01/31/2330252.html)

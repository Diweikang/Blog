# 深入理解JavaScript之执行上下文与执行上下文栈
## 执行上下文
上一篇中我们知道'作用域'是在代码编写完成后就已经确定了。

'执行上下文'，从字面就能知道它是在代码'执行'时创建确定的。

ECMA-262标准里提到'执行上下文'是一个抽象概念，每当控制器转到ECMAScript**可执行代码**时，就会进入到一个执行上下文，并且规范中没有准确的定义它的类型和结构。

我个人理解'执行上下文'更像是对'作用域'的一个具体实现，它更像是一个对象，拥有变量对象、作用域链、this属性，通过这些属性完成对代码执行过程的一个控制。

## 可执行代码
ECMAScript中可执行代码分为三种：全局代码、函数代码、eval代码。

## 执行上下文栈
程序中我们会写很多'可执行代码'，那么这么多的'执行上下文'又如何管理，这里就涉及到一个概念'执行上下文栈'。执行上下文栈就是一个'先进后出'的管理'执行上下文'的栈结构。

这里以函数为例：当执行流进入函数时，就会将函数的'执行上下文'压入'执行上下文栈'，当函数执行结束，对应的执行上下就会从执行上下文栈中弹出。


### 代码执行过程分析

为了模拟'执行上下文栈'，我们定义执行上下文栈是一个数组：
```js
ECStack = []
```
程序运行时，首先会执行全局代码，所以初始化时'执行上下文栈'中会压入一个'全局执行上下文'，我们用 globalContext表示它，当整个程序运行结束时，'全局执行上下文'globalContext会弹出栈结构，此时ECStack 才会被清空，所以程序运行结束前，ECStack 最底部永远有个 globalContext:
```js
ECStack = []
```
#### 代码分析(伪代码)
我们依旧拿上篇'作用域'中提到的权威指南中的例子分析代码执行时'执行上下文栈'是如何变化的.
##### 第一段代码
```js
var scope = "global scope"
function checkscope(){
    var scope = "local scope"
    function f(){
        return scope
    }
    return f()
}
checkscope()
```
##### 第二段代码
```js
var scope = "global scope"
function checkscope(){
    var scope = "local scope"
    function f(){
        return scope
    }
    return f
}
checkscope()
```
在上篇'作用域'文章中，我们分析上面两段代码的执行结果都是'local scope'，并没有什么不同，这节我们从指向上下文栈的角度分析下，看看具体异同。

第一段代码执行时：
```js
// 首先'全局执行上下文'进栈
ECStack.push(globalContext)
// 执行函数checkscope，函数执行上下文进栈
ECStack.push(functionContext-<checkscope>)
// 执行函数f，f函数执行上下文进栈
ECStack.push(functionContext-<f>)
// f执行完毕，函数执行上下文弹栈
ECStack.pop()
// checkscope执行完毕，函数执行上下文弹栈
ECStack.pop()
// 整个程序运行结束，全局执行上下文弹栈
ECStack.pop()
```

第二段代码执行时：
```js
// 首先'全局执行上下文'进栈
ECStack.push(globalContext)
// 执行函数checkscope，函数执行上下文进栈
ECStack.push(functionContext-<checkscope>)
// checkscope执行完毕，函数执行上下文弹栈
ECStack.pop()
// 执行函数f，f函数执行上下文进栈
ECStack.push(functionContext-<f>)
// f执行完毕，函数执行上下文弹栈
ECStack.pop()
// 整个程序运行结束，全局执行上下文弹栈
ECStack.pop()
```
总结：虽然上面两段代码执行结果相同，但是我们从执行上下文栈的角度分析，它们执行的过程还是有所不同的，对于执行过程中更详细的区别，我们留在学习执行上下文属性(变量对象、作用域链、this)时，再做更详细的分析。
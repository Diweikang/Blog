# 深入理解JavaScript之this
  在网上看到很多关于讲关键字this的文章，几乎都是从各种函数调用场景分析this的指向，但是在网上看到了**讶羽大大**一篇关于this的讲解，但是读了之后还是不太懂，然后字节结合ECMAScript规范又重新梳理学习了一遍。

  在之前的<<执行上下文与执行上下文栈>>中说到，JavaScript遇到可执行代码时会创建执行上下文，执行上下文拥有三个主要属性'变量对象'、'作用域链'、'this'：
  ```js
    context: {
      VO: {},
      Scope: [],
      this: reference to thisValue
    }
  ```
  其中的'变量对象'和'作用域链'在前两篇中已经学习，这节学习其中的第三个属性'this'。

## 变量类型
  规范中对类型解释：
  ![类型划分](./static/2types.jpg)
  ECMAScript中的变量类型分为：语言类型和规范类型。

  语言类型：我们在开发中可以直接访问的类型，包括：
    String、Number、Boolean、Null、Undefined、Symbol、Object。

  规范类型：只存在于ECMAScripe规范中，用来描述ECMAScript语言结构、类型、底层行为逻辑的类型，包括：Reference, List, Completion, Property Descriptor, Property Identifier, Lexical Environment, 和 Environment Record。

  规范类型的中的Reference类型和this的执行有着密切的关系。

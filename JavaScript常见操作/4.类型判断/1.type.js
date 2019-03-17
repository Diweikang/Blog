// 第一版
var types = "Boolean Number String Function Array Date RegExp Object Error Null Undefined"

/* 1.生成class2type的映射
2.[Object 'type']作为key，小写的type值作为value。 */
var class2type = {}
types.split(" ").map(item => {
    class2type["[object " + item + "]"] = item.toLowerCase()
})
// 如果是基本类型用typeof判断，其他类型用Object.prototype.toString()判断
function checkType(obj) {
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[Object.prototype.toString.call(obj)] || "object" :
        typeof obj
}

console.log( checkType(1))              // number
console.log( checkType('123'))          // string
console.log( checkType(true))           // boolean
console.log( checkType(undefined))      // undefined
console.log( checkType(null))           // null
console.log( checkType({a: 1}))         // object
console.log( checkType([1, 2, 3]))      // array
console.log( checkType(new Date()))     // date
console.log( checkType(new Error()))    // error
console.log( checkType(/a/g))           // regexp
console.log( checkType(function a(){})) // function
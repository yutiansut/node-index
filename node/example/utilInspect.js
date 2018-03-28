const util = require("util");

function Person () {
	this.name = "byvoid";
	this.toString = function () {
		return this.name;
	}
}

const obj = new Person();
// console.log(util.inspect(obj));//调试需要 看数据源情况
// console.log(util.inspect(obj,true,1,true));


const arr = [1,2,3];
console.log(util.isArray(arr));//判断是不是数组
console.log(util.isArray(new Array));
console.log(util.isArray({}));

console.log(util.isRegExp(/some regexp/));//判断是不是正则
console.log(util.isRegExp(new RegExp("another regexp")));
console.log(util.isRegExp({}));

console.log(util.isDate(new Date()));//判断是不是日期
console.log(util.isDate({}));

console.log(util.isError(new Error()));//判断是不是错误对象
console.log(util.isError(new TypeError()));//判断是不是错误对象
console.log(util.isError([]));//判断是不是错误对象
console.log(util.isError({name:"Rrror",message:"an error message"}));
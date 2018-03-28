const util = require("util");
function Base () {
	this.name = "base";
	this.base = 1991;
	this.sayHello = function () {
		console.log("hello" + this.name);
	}
}

Base.prototype.showName = function () {//原型中定义的属性 不属于构造函数内部的属性跟方法
	console.log(this.name);
};

function Sub () {
	this.name = "sub";
}

util.inherits(Sub,Base);
const objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);
const objSub = new Sub();
objSub.showName();
//objSub.sayHello();此处报错  也就是说用 inherits原型继承，仅仅继承了在原型中定义的函数（prototype）,构造函数内部的属性跟方法没有继承
console.log(objSub);


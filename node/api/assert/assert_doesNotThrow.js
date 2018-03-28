const assert = require("assert");
// assert.doesNotThrow(//没有在断言中匹配错误类型
// 	() => {
// 		throw new TypeError("错误信息");
// 	},
// 	SyntaxError
// );
// 
// assert.doseNotThrow(// 抛出带有Got unwanted exception (TypeError)信息的 AssertionError
// 	() => {
// 		throw new TypeError("错误信息");
// 	},
// 	TypeError
// );

assert.doseNotThrow(
	() => {
		throw new TypeError("错误信息")；
	},
	TypeError,
	"抛出错误"
);
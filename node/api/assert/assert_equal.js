const assert = require("assert");

//assert.equal(1,1);//通过 

//assert.equal(1,"1");//通过 隐士转换 不是严格模式

//assert.equal(1,"2");//1!=2

assert.equal({a:{b:1}},{a:{b:1}});

const assert = require ("assert"); //Y严格比较
// assert.deepStrictEqual({a:1},{a:"1"});//1！= “1”


const date = new Date();
const object = {};
const fakeDate = {};
Object.setPrototypeOf(fakeDate,Date.prototype);

//assert.deepEqual(object,fakeDate);//不测试原型
//
//assert.deepStrictEqual(object,fakeDate);//原型不同

//assert.deepEqual(date,fakeDate);//不测试类型标签

//assert.deepStrictEqual(date,fakeDate);//；类型标签不同

//assert.deepStrictEqual(new Number(1),new Number(2));//数值包装器里面的数值不同
//
assert.deepStrictEqual(new String("foo"),new Object("foo"));//对象里面的数值是相同的
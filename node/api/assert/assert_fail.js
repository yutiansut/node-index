const assert = require("assert");
//assert.fail(3,2,undefined,">");

//assert.fail(1,2,"错误信息");

//assert.fail(1,2,"错误信息",">");

//assert.fail();

//assert.fail("错误信息");

//assert.fail("a","b");
//
function suppressFramme () {
	assert.fail("a","b",undefined,"!==",suppressFrame);	
}

suppressFramme();
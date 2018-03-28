const assert = require("assert");

assert.ifError(0);
//assert.ifError(undefined);
//assert.ifError(false);
// assert.ifError("error");
// assert.ifError(1);
assert.ifError(new Error());
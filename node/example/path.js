let path = require("path");
console.log("normalization:" + path.normalize('/test/test1//2slashes/1slash/tab/..'));
// 连接路径
console.log('joint path : ' + path.join('/test', 'test1', '2slashes/1slash', 'tab', '..'));

// 转换为绝对路径
console.log('resolve : ' + path.resolve('path.js'));

// 路径中文件的后缀名
console.log('ext name : ' + path.extname('path.js'));
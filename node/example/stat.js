const fs = require("fs");
console.log("准备打开文件");
fs.stat("input.txt",function(err,stats){
	if (err) {
		return console.log(err)
	}
	console.log(stats);
	console.log("读取信息成功！");

	console.log("是否为文件（isFile）?" + stats.isFile());
	console.log("是否为目录（isDirectory）?" +stats.isDirectory);
});
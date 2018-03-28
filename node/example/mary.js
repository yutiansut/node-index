const fs = require("fs");
fs.readFile("input.txt",function(err,data){
	if(err) return console.error(err);
	console.log(data.toString());
});
console.log("我表白结束--李雪魁2018/01/29");
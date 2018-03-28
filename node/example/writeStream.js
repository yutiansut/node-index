const fs = require("fs");
let data = "刘6 I Love You 爱你一万年！";
const writeStream = fs.createWriteStream("output.txt");
writeStream.write(data,"UTF8");
writeStream.end();
writeStream.on("finish",function(){
	console.log("求婚成功");
});
writeStream.on("error",function(err){
	console.log(err,stack);
});
console.log("结婚成功");
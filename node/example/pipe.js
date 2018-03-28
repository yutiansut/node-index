const  fs = require("fs");
const readerStream = fs.createReadStream("input.txt");
const writeStream = fs.createWriteStream("output1.txt");
readerStream.pipe(writeStream);
console.log("结婚成功");
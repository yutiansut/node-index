console.log(__filename);
console.log(__dirname);
var a = 0;
console.time("a");
function Hello () {
	console.log("我爱你啊")
}
function Add () {
	a++;
	if (a>=5) {
		clearInterval(timer);
	}
	console.log(a)
}
var timer = setInterval(Add,1000);
setTimeout(Hello,3000);
console.timeEnd("a");

process.on("exit",function(code){
	setTimeout(function(){
		console.log("nonono")
	},0)
	console.log("退出码为：",code);
});
console.log("over");
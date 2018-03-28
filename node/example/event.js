//引入events 模块
const events = require("events"); 
//创建 eventEmitter 对象
const eventEmitter = new events.EventEmitter();
//创建事件处理程序
const connectHandle = function connected() {
	console.log("配对成功");
	//触发 data_received 事件
	eventEmitter.emit("data_received");
}
//绑定connection 事件处理程序
eventEmitter.on("connection",connectHandle);
//使用匿名函数绑定data_received事件
eventEmitter.on("data_received",function(){
	console.log("表白成功");
});

//触发connection事件
eventEmitter.emit("connection");
console.log("结婚成功");
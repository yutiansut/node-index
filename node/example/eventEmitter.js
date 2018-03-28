const events = require("events");
const eventEmitter = new events.EventEmitter();
const listener1 = function () {
	console.log("监听器listener1 执行");
};
const listener2 = function () {
	console.log("监听器listener2 执行")
};
eventEmitter.addListener("connection",listener1);
eventEmitter.on("connection",listener2);
var eventListeners = require("events").EventEmitter.listenerCount(eventEmitter,"connection");
console.log(eventListeners +"个监听器监听连接事件");
eventEmitter.emit("connection");
eventEmitter.removeListener("connection",listener1);
console.log("listener1 不再受监听。");
eventEmitter.emit("connection");
eventListeners = require("events").EventEmitter.listenerCount(eventEmitter,"connection");
console.log(eventListeners + " 个监听器监听连接事件。");
console.log("程序执行完毕。");

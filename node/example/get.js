const http = require("http");
const url = require("url");
const util = require("util");

// http.createServer(function(req,res){
// 	res.writeHead(200,{"Content-Type":"text/plain;charset=utf-8"})
// 	res.end(util.inspect(url.parse(req.url,true)));
// }).listen(3005);
// 
http.createServer(function(req,res){
	res.writeHead(200,{"Content_Type":"text/plain;charset=utf-8"});
	const params = url.parse(req.url,true).query;
	res.write("网站名："+params.name);
	res.write("\n");
	res.write("网站url:"+params.url);
	res.end();
}).listen(3007);
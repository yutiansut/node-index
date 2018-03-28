var http = require("http");
var url = require("url");
function start (route) {
	function onRequest (request,response) {
		var pathName = url.parse(request.url).pathname;
		console.log("request for" +pathName+"received");
		route(pathName);
		response.writeHead(200,{"Content-Type" : "text/plain"});
		response.write("helloWorld");
		response.end();		
	}

	http.createServer(onRequest).listen(8685);
	  console.log("Server has started.");
}

exports.start = start;
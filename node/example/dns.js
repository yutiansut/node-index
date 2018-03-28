var dns = require("dns");
dns.lookup("jrdz365.com",function onLookup(err,address,family){
	console.log("ip地址：",address);
	dns.reverse(address,function(err,hostnames){
		if (err) {
			console.log(err.stack);
		}
		console.log('反向解析 ' + address + ': ' + JSON.stringify(hostnames));
	});
});
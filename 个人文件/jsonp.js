function jsonp(options){
	if(!options.url){return;}
	options = options||{};
	options.data = options.data||{};
	options.cbName = options.cbName||'cb';
	options.timeout = options.timeout||10000;
	var fnName = 'jsonp_p'+Math.random();
	var fnName = fnName.replace('.','');
	var timer = setTimeout(function(){
		options.error&&options.error();
		window[fnName] = null;
	},options.timeout);
	
	window[fnName] = function(json){ 
		console.log(window[fnName])
		options.success&&options.success(json);
		clearTimeout(timer);
		// document.getElementsByTagName('head')[0].removeChild(oS);
	};
	//cb = show
	options.data[options.cbName] = fnName;
	var arr = [];
	for(var name in options.data){
		arr.push(name+'='+options.data[name]);
	}
	var oS = document.createElement('script');
	oS.src = options.url+'?'+arr.join('&');	
	document.getElementsByTagName('head')[0].appendChild(oS);
}

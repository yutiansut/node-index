//开发服务器
// let  baseUrl = "http://123.206.62.242/easytrader";
// let  basePKImg="http://123.206.62.242/";
// let  base = "ws://123.206.62.242";


//测试服务器
let baseUrl = "http://www.jrdz365.com/easytrader";
let basePKImg="http://www.jrdz365.com/";
let base = "ws://www.jrdz365.com";
let tcpServer = "ws://www.jrdz365.com:8888/websocket";
let httpBase = "http://www.jrdz365.com";
let baseContract = "ws://www.jrdz365.com:8200/websocket";
let baseTrader = "ws://www.jrdz365.com:8400/websocket";
let UrlP = {
    	
        "wsapi" :{
        	"getNewPrice":base+"/easytrader/websocket/char.servlet",
        	"chatUrl":base+"/easytrader/websocket/char.servlet",
        	"pubHttpUrl":httpBase,
        	"newUrlBase":baseContract,
        	"traderSocket":baseTrader
        } 
}
export default UrlP;
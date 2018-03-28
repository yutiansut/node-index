//实时数据状态管理组件
import {extendObservable,observable, action, computed, useStrict} from 'mobx';// 官网的create_app 不支持es7的@装饰器 用extendObservable代替。
import UrlP from 'api/api';
const newWbsocket=new WebSocket(UrlP.wsapi.newUrlBase);
newWbsocket.onopen = () => {
  newWbsocket.send("LIVEDINIT-CL");
  setTimeout(function(){
    newWbsocket.send("HISD-CL");
  },100);

  window.onunload = function() { //页面关闭的时候  切断websocket 连接。    
     newWbsocket.close();
  };
};
const Store = function(){
    extendObservable(this, {//this指的就是 mobox Store
        lastObject:observable({//默认数据
		  	bid:"55.6",
		    ask:"55.5",
		    bidSize:"12",
		    askSize:"99",
		    last:"55.8",
		    change:"0.1",
		    voluemTotal:"2145万",
		    time:"12:12",
		    sock:newWbsocket
		}),
        isShow:action(function(str){//默认数据 在action里面变换 可操作或者componentDidMount里面直接操作
        	newWbsocket.onmessage = (evt) => {
				const data = JSON.parse(evt.data);
				//console.log(data);
				if(data.commandType == "mkd"){
		  			this.lastObject.bid = data.bid;
				    this.lastObject.ask = data.ask;
				    this.lastObject.bidSize = parseInt(data.bidSize);
				    this.lastObject.askSize = parseInt(data.askSize);
				    this.lastObject.last = data.last;
				    this.lastObject.change = parseFloat(data.change).toFixed(3);
				    this.lastObject.voluemTotal = "2145万";
				    this.lastObject.time = "12:12";
				}
			};
        }),
        unfinishedTodos:computed(function(){ 
		    return this.dataAll;
        })
    })
}
const lastStore = new Store();

export default lastStore;
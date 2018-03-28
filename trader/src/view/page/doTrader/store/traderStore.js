//实时交易状态管理组件
import {extendObservable,observable, action} from 'mobx';// 官网的create_app 不支持es7的@装饰器 用extendObservable代替。
import UrlP from 'api/api';
import HttpP from "mixin/httpPub";
const Store = function(){
    extendObservable(this, {//this指的就是 mobox Store
	    routerType : observable(0),//请求数据类型--进来方式 从哪儿进的交易界面
      contractName:observable(""),//合约名字
      isBuyClosedName:observable("买多"),//合约名字
      isSellClosedName:observable("卖空"),//合约名字
      orserIdArr:[],
      otherZoom:observable("0"),//判断点的区域名字,
      orserId:observable(""),//订单Id
      isChicang:observable("0"),//订单Id
      typeCategory:localStorage.typeCategory ? observable(localStorage.typeCategory) : observable("1"),//区分是股票还是期货还是数字货币
      socket:observable(//一些数组储存数据 及一些共用的变量 如socket
        { 
          traderSocket : null,
          pubObj:{
          },
          holdList:[],//持仓
          entrustList:[],//委托
          hangList:[],//挂单
          historyList:[],
        }
      ),
      pubObj:action(function(json){
          return {
            "modle": "ORDERDATA",//string常量，固定值
            "active": json.active || "ENTER",   //string 操作动作OPEN下单买入//CLOSE平仓或卖出//
            "room": json.room || 1,         //int房间常量，固定值
            "token": json.token || "",    //string用户登陆标示
            "clientType": 0,   //int客户端类别，0:H5,  1:android,  2:ios,  3:pc
            "data": [
             {
                 "contractKey": json.contractKey || "", //string合约key
                 "exchangeEnum": json.exchange || 0 //int交易所 枚举值。0:空值，1纽约金属，2:纽约商业，3:香港
             }
            ],
            "category": this.typeCategory, //int  1期货；2港股；3美股。 0:空值
            "side": json.side || 0,  //string 期货：买张buy；买跌sell；//股票：买入buy；卖出sell      "quantity": 0,    //int下单手数
            "price": json.price || 0,         //double下单单价
            "priceType": this.typeCategory == 1 ? 1 : 2,  //int //1:对手价；2:市价；3:条件价(1);4:条件价(2);5:条件价(3) //股票：1:限价；2:市价；3:条件价(1);4:条件价(2);5:条件价(3) 
            "winLimit":json.winLimit || 0 ,  //double 止盈
            "lostLimit":json.lostLimit || 0,   //double  止损
            "margin": json.margin || 0,   //double   保证金
            "commission":json.commission || 0 , //double  手续费
            "dataId":json.dataId || [], //long数组，平仓单id  （List<Long>）
            "quantity":json.quantity || 0,    //int下单手数
          }
      }),
      socketOpen:action(function(obj){//obj看哪个页面刷新在创建新的socket 得到data.connect == "ok" 在获取对应的值 
        const enterObject = {
          "active":"ENTER",
          "room":1,
          "token":localStorage.token
        };
      	this.socket.traderSocket = new WebSocket(UrlP.wsapi.traderSocket);
      	this.socket.traderSocket.onopen = () => {
      		this.socket.traderSocket.send(JSON.stringify(this.pubObj(enterObject)));          
      	};
      	this.socket.traderSocket.onmessage = (evt) => {
          this.orserIdArr.length = 0;
      		const data = JSON.parse(evt.data);
          // console.log(data);
          if (data.dataType === "ENTER") {//建立连接
            if (data.connect === "ok" && obj) {              
               this.socket.traderSocket.send(JSON.stringify(this.pubObj(obj)));
            }
          } else if (data.dataType === "ORDERLIST") {//合约列表
            if (data.holdList) {
              this.socket.holdList = data.holdList;
              this.socket.entrustList = data.entrustList;
              this.socket.hangList = data.hangList;
              for (let i = 0; i<this.socket.holdList.length;i++) {
               this.orserIdArr.push(this.socket.holdList[i].orderId);
              }
            } else {
              return;
            }
            
            //console.log(this.orserIdArr);
          } else if (data.dataType === "DEAL") {//合约列表
            // console.log(data);
            alert(data.message);
            this.isBuyClosedName.set("买多");
            this.isSellClosedName.set("卖空");
          }
      	};
      }),
      /*合约列表*/
      listGet:action(function(){
        const orderListObject = {
          "active":"ORDER",
          "room":1,
          "token":localStorage.token,
        };
        this.socket.traderSocket.send(JSON.stringify(this.pubObj(orderListObject)));
      }),
       /*下单*/
      madeOrder:action(function(side,key,change,num){//obj看哪个页面刷新在创建新的socket 得到data.connect == "ok" 在获取对应的值 
        const madeOrderObject = {
          "side":side,
          "contractKey":key,
          "exchange":change,
          "active":"OPEN",
          "room":1,
          "token":localStorage.token,
          "price":0,
          "quantity":num,
        };
        // console.log(this.pubObj(madeOrderObject))
        this.socket.traderSocket.send(JSON.stringify(this.pubObj(madeOrderObject)));
      }),
        /*平仓*/
      closedOrder:action(function(side,num,idArr,key,change){
        const closedOrderObject = {
          "side":side,
          "quantity":num,
          "dataId":idArr,
          "contractKey":key,
          "exchange":change,
          "active":"CLOSE",
          "room":1,
          "token":localStorage.token,
          "price":0
        }
        console.log(this.pubObj(closedOrderObject));
        this.socket.traderSocket.send(JSON.stringify(this.pubObj(closedOrderObject)));
      }),
      /*清仓*/
      clearClosedOrder:action(function(arr){
        const clearClosedOrderObj = {
          "dataId":arr,
          "modle":"ORDERDATA",
          "active":"HOLDCLEAR",
          "room":1,
          "token":localStorage.token,
        }
        this.socket.traderSocket.send(JSON.stringify(this.pubObj(clearClosedOrderObj)));
      }),
      /*反手*/
      backHand:action(function(arr){
        const backHandObject = {
          "dataId":arr,
          "modle":"ORDERDATA",
          "active":"BACKHAND",
          "room":1,
          "token":localStorage.token,
        };
        this.socket.traderSocket.send(JSON.stringify(this.pubObj(backHandObject)));
      }),
      /*历史订单*/
      historyOrder:action(function(){
        let token = localStorage.token;
        let category = this.typeCategory;//?????????变为全局切换
        let client = 0;
        HttpP.NN_historyOrderP({"token":token,"category":category,"client":client}).then(
          (res)=>{
            if(!res.result){
              alert(res.message);
            }else{
              console.log(res)
              if (res.result) {
                  this.socket.historyList = res.resultData.orderDataList;
              }
            }
          }
        );
      }),
    })
}
const traderStore = new Store();
export default traderStore;
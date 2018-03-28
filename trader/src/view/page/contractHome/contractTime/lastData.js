// 竖屏显示实时数据页面  数据是靠父级传过来的 
import React, { Component } from 'react';
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
const LastData = inject("liveStore","contractStore")(observer(class LastData extends Component {//inject 是一个函数   函数return一个函数 这个return的函数参数是一个observer函数
	componentDidMount (){
	    let Key = localStorage.contractKey ;
	    let Enum = localStorage.exchangeEnum;
	    const hadicapObject = {
	      "clientType":0,
	      "contractKey":Key,
	      "exchangeEnum":Enum,
	      "modle":"MAKETDATA",
	      "active":"SUBTICK",
	      "room":1,
	      "token":localStorage.token,
	    };
	    if (this.props.liveStore.socket.newSocket == null) {
	        this.props.liveStore.socketOpen(hadicapObject);
	    }
	    this.props.liveStore.handicapData(Key,Enum);	
  	}
  	componentWillUnmount() {
   		
  	}
	render() {
		let bidSize = this.props.liveStore.handicapNavListObj.bidSize;
		let bid = this.props.liveStore.handicapNavListObj.bid;
		let askSize = this.props.liveStore.handicapNavListObj.askSize;
		let ask = this.props.liveStore.handicapNavListObj.ask;
		let lastPrice = this.props.liveStore.handicapNavListObj.lastPrice;
		let ud = this.props.liveStore.handicapNavListObj.ud;
	    return (
	        <div className="clearfix lastPrice">
	              <div className="fl lastPriceLeft">
	                <div className="clearfix">
	                    <span className="fl">买</span>
	                    <b className="fl">{bid}</b>
	                    <span className="fl">{bidSize}</span>
	                </div>
	                <div className="clearfix">
	                    <span className="fl">卖</span>
	                    <b className="fl">{ask}</b>
	                    <span className="fl">{askSize}</span>
	                </div>
	              </div>
	              <div className="fl lastPriceRight">
	                  <p className="bigLast">{lastPrice}</p>
	                  <p>{ud + "/" +((ud/lastPrice).toFixed(2) + "%")}</p>
	              </div>
	        </div>
	    );
  	}
}));
export default LastData;
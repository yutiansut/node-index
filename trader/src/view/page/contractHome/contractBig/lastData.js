// 横屏显示实时数据页面  数据是靠父级传过来的 
import React, { Component } from 'react';
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
import { Link ,withRouter } from 'react-router-dom';//此处做了一个路由跳转 暂时做的主路由 TODO 作为首页的子路由
const LastDataBig = inject("liveStore")(observer(class LastDataBig extends Component { //inject 是一个函数   函数return一个函数 这个return的函数参数是一个observer函数
	//observer函数返回一个带有父级props的数据管理对象的LastDataBig 这个对象等同于父级传过来的inject第一个参数的（lastStore）props 即调用的时候用this.props.lastStore;
	changeContractType (){//点击切换不同屏幕类型时 都要把行情数据状态转换为 分时图 todo:用mobx管理
    	// localStorage.contractType = "5M0";
  	}
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
  	changeSmallPage () {
  		this.props.liveStore.changeId("container");
    	this.props.history.push("/pages/contract/changeSmall");
  	}
	render() {
	    return (
	    	<div className="clearfix contractBigHead">
	            <i className="fl"></i>
	            <span className="fl">{this.props.liveStore.handicapNavListObj.name}</span>
	            <p className="fl">{this.props.liveStore.handicapNavListObj.lastPrice + "("+(this.props.liveStore.handicapNavListObj.ud) + "/" +((this.props.liveStore.handicapNavListObj.ud/this.props.liveStore.handicapNavListObj.lastPrice).toFixed(2) + "%")+")"}</p>
	            <strong className="fl">成交量</strong>
	            <b className="fl">{this.props.liveStore.handicapNavListObj.voluem}</b>
	            <strong className="fl">时间</strong>
	            <b className="fl">{this.props.liveStore.handicapNavListObj.dateTime}</b>
	            <div onClick = {this.changeSmallPage.bind(this)} className="fl changeSmall" ></div>
          	</div> 
	    );
  	}
}));
export default withRouter(LastDataBig);
//竖屏行情页面
import React, { Component } from 'react';
import './handicap.css';
import {withRouter } from 'react-router-dom';//可以把router引进来 用里面的方法 如：返回上一个历史页面或者跳转到指定路由页面
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
import HeadTitle from "com/headtitle/headTitle";
const Handcap = inject("liveStore")(observer(class Handcap extends Component {
  constructor(props){
      super(props)
      this.state = {
          
      };
  }
  componentDidMount () {
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
  //dom创建
  render() {
    return (
      <div className="handicap">
         <HeadTitle titleH="盘口" />
         <div className="handicapNav">
            <ul>
              <li className = "clearfix">
                <span className = "fl">最新</span>
                <b className = "fl">{this.props.liveStore.handicapNavListObj.lastPrice}</b>
                <i className = "fl">涨跌</i>
                <b className = "fl colW">{this.props.liveStore.handicapNavListObj.ud}</b>
              </li>
              <li className = "clearfix">
                <span className = "fl">买价</span>
                <b className = "fl">{this.props.liveStore.handicapNavListObj.bid}</b>
                <i className = "fl">买量</i>
                <b className = "fl colW">{this.props.liveStore.handicapNavListObj.bidSize}</b>
              </li>
              <li className = "clearfix">
                <span className = "fl">卖价</span>
                <b className = "fl">{this.props.liveStore.handicapNavListObj.ask}</b>
                <i className = "fl">卖量</i>
                <b className = "fl colW">{this.props.liveStore.handicapNavListObj.askSize}</b>
              </li>
              <li className = "clearfix">
                <span className = "fl">开盘</span>
                <b className = "fl">{this.props.liveStore.handicapNavListObj.openPrice}</b>
                <i className = "fl">成交量</i>
                <b className = "fl colW">{this.props.liveStore.handicapNavListObj.volume}</b>
              </li>
              <li className = "clearfix">
                <span className = "fl">最高</span>
                <b className = "fl">{this.props.liveStore.handicapNavListObj.highPrice}</b>
                <i className = "fl">持仓量</i>
                <b className = "fl colW">{this.props.liveStore.handicapNavListObj.etfIOPV}</b>
              </li>
              <li className = "clearfix">
                <span className = "fl">最低</span>
                <b className = "fl colG">{this.props.liveStore.handicapNavListObj.lowPrice}</b>
                <i className = "fl colW">日增仓</i>
                <b className = "fl colW">----</b>
              </li>
              <li className = "clearfix">
                <span className = "fl">均价</span>
                <b className = "fl colW">--</b>
                <i className = "fl">结算</i>
                <b className = "fl colW">---</b>
              </li>
              <li className = "clearfix">
                <span className = "fl">昨收</span>
                <b className = "fl">{this.props.liveStore.handicapNavListObj.preClosePrice}</b>
                <i className = "fl">昨结</i>
                <b className = "fl colW">{this.props.liveStore.handicapNavListObj.closePrice}</b>
              </li>
              <li className = "clearfix">
                <span className = "fl">涨停</span>
                <b className = "fl">{this.props.liveStore.handicapNavListObj.udPer}</b>
                <i className = "fl">外盘</i>
                <b className = "fl colW">---</b>
              </li>
              <li className = "clearfix">
                <span className = "fl">内盘</span>
                <b className = "fl ">{this.props.liveStore.handicapNavListObj.lastPrice}</b>
                <i className = "fl">外盘</i>
                <b className = "fl colW">----</b>
              </li>
            </ul>
         </div>
      </div>
    );
  }
}));
export default withRouter(Handcap);

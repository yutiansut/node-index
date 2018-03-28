// 策略页面
import React, { Component } from 'react';
import './index.css';
import {Link,withRouter} from "react-router-dom";
import Footer from 'com/footer/footer';//footer模拟数据
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
import TraderHeader from "./head";//头部
import FuturesMoney from "./futuresMoney";//期货资金情况  
import FuturesChangeNum from "./futuresChangeNum";//交易下单参数修改区域 
import DifTypeName from "./difTypeName";//切换类型区域  
import DifOrderList from "./difTypeOrderList";//订单展示区域  
const DoTrader = inject("traderStore","liveStore")(observer(class DoTrader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    
  }
  render() {
    return (
      <div className="doTrader">
          <TraderHeader />
          <FuturesMoney />
          <FuturesChangeNum />
          <DifTypeName />
          <DifOrderList />
      </div>
    );
  }
}));
export default withRouter(DoTrader);




// 策略页面
import React, { Component } from 'react';
import './plot.css';
import {Link,withRouter} from "react-router-dom";
import Footer from 'com/footer/footer';//footer模拟数据
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
const Plot = inject("plotStore","traderStore")(observer(class Plot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "colorType":"plot",
    };
  }
  componentDidMount() {
    if(localStorage.token) {
      this.props.plotStore.plotHttpTypeAc(localStorage.token);
    } else {
      this.props.plotStore.plotAc(0,0);
    }
  }
  goNewPath () {
      if (this.props.plotStore.plotType == 0) {
        this.props.history.push("/pages/plot/plotFirst");
      } else if (this.props.plotStore.plotType == 1) {
        this.props.history.push("/pages/plot/plotThird");
      }
  }
  goTrader () {
      this.props.traderStore.routerType.set(0);
      this.props.history.push("/pages/dotrader");
  }
  render() {
    const processCircleWidthF= {width:3.7*this.props.plotStore.processNum/3+"rem"};//根据数据来判断第一项小项的进度条长度
    const processCircleWidthS = {width:3.7*this.props.plotStore.processCount/2+"rem"};//根据数据来判断第二项小项的进度条长度
    const chectWidth = {width:this.props.plotStore.processNum >=3 ? "0.5rem" : 0};//根据数据来判断第二项大项的进度 判断是否变状态色
    const  tradeWidth = {width:this.props.plotStore.processCount >= 2 ? "0.5rem" : 0};//根据数据来判断第三项大项的进度 判断是否变状态色
    return (
      <div className="plotRute">
          <div className="homeHead hB">策略</div>
          <div className="clearfix poltProcess">
            <div className="fl openAccount">
              <p>开户</p>
              <div><i></i><span></span></div>
            </div>
            <div className="poltProcessLine fl"><b style = {processCircleWidthF}></b></div>
            <div className="fl openAccount">
              <p>审核</p>
              <div><i style = {chectWidth}></i><span></span></div>
            </div>
            <div className="poltProcessLine fl"><b style = {processCircleWidthS}></b></div>
            <div className="fl openAccount">
              <p>交易</p>
              <div><i style = {tradeWidth}></i><span></span></div>
            </div>
          </div>
          <div className="plotCaption">
            <ul>
              <li className="clearfix">
                <i className="fl"></i>
                <span className="fl">智慧交易</span>
              </li>
              <li className="clearfix">
                <i className="fl buildRelatiopn"></i>
                <span className="fl">极速连接</span>
              </li>
              <li className="clearfix">
                <i className="fl trust"></i>
                <span className="fl">值得信赖</span>
              </li>
            </ul>
          </div>
          <p className= {(this.props.plotStore.plotType)%2 === 1 ? "openAccountBtn" : "openAccountBtnY"}  onClick = {this.goNewPath.bind(this)}>{this.props.plotStore.plotBtnNav.get()}</p>
          <div className="openAccountNotice">开户前请准备好：二代身份证，银行借记卡，3G/4G/WIFI网络</div>
          <div className="openAccountIsOk" onClick = {this.goTrader.bind(this)}>已开户，去登录</div>
          <Footer typeColor={this.state.colorType} />
      </div>
    );
  }
}));
export default withRouter(Plot);

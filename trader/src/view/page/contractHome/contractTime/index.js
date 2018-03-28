//竖屏行情页面
import React, { Component } from 'react';
import './index.css';
import DrawPic from 'mixin/drawpic'; //画图 
import { Link ,withRouter } from 'react-router-dom';
import LastData from './lastData.js';//实时数据
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
const ContractTime = inject("liveStore","traderStore")(observer(class ContractTime extends Component {
  constructor(props){
      super(props)
      this.state = {
          contractName:localStorage.contractChinaName,
          contractListArr:[{//不同行情k线数据按钮样式 内容 自定义属性等数组 但是最后一个按钮是一个下拉列表 所以 子组件drawpic里面typeof drawpic判断listHtml是函数还是字符串
            "widthNum":{width:"1.6rem",color:"yellow"},
            "listHtml":"分时",
            "clName":"fl",
            "name":"5M0"
            },{
              "widthNum":{width:"1.8rem"},
              "listHtml":"季K",
              "clName":"fl",
              "name":"5D"
            },{
              "widthNum":{width:"1.8rem"},
              "listHtml":"月K",
              "clName":"fl",
              "name":"1MO"
            },{
             "widthNum":{width:"1.8rem"},
              "listHtml":"周K",
              "clName":"fl",
              "name":"1W"
            },{
              "widthNum":{width:"1.8rem"},
              "listHtml":"日K",
              "clName":"fl",
              "name":"1D"
            },{
              "widthNum":{width:"1.8rem"},
              "listHtml":() => (
                <div className="clearfix">
                  <span className="fl">分钟</span><b className="fl triangleTop"></b>
                </div>
              ),
              "clName":"fl  indicatorsKPoin",
              "name":""
          }],
          contractListMinuteArr:[{//k线数据的 内容 样式等
            "listHtml":"1分",
            "name":"1M"
            },{
              "listHtml":"5分",
              "name":"5M"
            },{
              "listHtml":"15分",
              "name":"15M"
            },{
              "listHtml":"30分",
              "name":"30M"
            },{
              "listHtml":"60分",
              "name":"1H"
          }]
      };
  }
  componentDidMount () {
    this.props.liveStore.changeId("container");
  }
  clickToBigPage () {
    this.props.liveStore.changeId("container1");
    this.props.history.push("/pages/contract/changeBig");
  }
  clickToHandCapPage () {
    this.props.history.push("/pages/contract/handicap");
  }
  clickToplotPage () {
    this.props.traderStore.routerType.set(1);
    this.props.history.push("/pages/dotrader");
  }
  //dom创建
  render() {
    return (
      <div className="contractTime">
          <div className="clearfix contractHead">
            <Link className="fl back" to="/pages/contract"></Link>
          	<span className="fl">{this.props.traderStore.contractName.get()}</span>
          	<b className="fl otherList"></b>
          </div>
          <DrawPic  contractListArr={this.state.contractListArr} contractListMinuteArr={this.state.contractListMinuteArr}/>
          <LastData />
          <div className="news"></div>
          <ul className="clearfix iconList">
          	<li className="fl marL handicapBtn" onClick = {this.clickToHandCapPage.bind(this)}></li>
          	<li className="fl marL1 shareBtn"></li>
          	<li className="fl iconTraderBtn" onClick = {this.clickToplotPage.bind(this)}></li>
          	<li className="fl noticeBtn"></li>
          	<li className="fl marL1 ownChoiceBtn"></li>
          </ul>
          <div onClick = {this.clickToBigPage.bind(this)} className="fl changeBig"></div>
      </div>

    );
  }
}));
export default withRouter(ContractTime);

//合约列表 组件
import React, { Component } from 'react';
import './index.css';
import 'api/jsMock';//mock模拟数据
import { withRouter } from 'react-router-dom';//router
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
const ContractList = inject("liveStore","traderStore")(observer(class ContractList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "colorType":"quotes",
      "default":"0",//记录不同业务的下标  对应difTypeContractArr
      "sortNum":1,//当前业务下合约排序顺序代号 
      "sortName":"consort0 fl"//className  跟sortNum 关联起来 可以方便切换不同的样式
    };
  }
  //点击排序
  clickSor(){//每次点击排序 sortNum需要切换 根据sortNum来判断不同的样式及产生的排序效果
    this.setState((prevState) => ({
      "sortNum": prevState.sortNum + 1
    }));
    if(this.state.sortNum >= 2){
        this.setState({
          "sortNum": 0
        });
    }
    this.setState({//根据 sortNum 来产生新的className
      "sortName": "fl consort"+this.state.sortNum
    });
  }
  contractShowKLine(event) {
      let contractKey = event.target.getAttribute("data-contractKey") === null ? event.target.parentNode.parentNode.getAttribute("data-contractKey") : event.target.getAttribute("data-contractKey");
      let exchangeEnum = event.target.getAttribute("data-exchangeEnum") === null ? event.target.parentNode.parentNode.getAttribute("data-exchangeEnum") : event.target.getAttribute("data-exchangeEnum");
      localStorage.contractKey = contractKey;
      localStorage.exchangeEnum = exchangeEnum;
      localStorage.contractChinaName = event.target.getAttribute("data-Tname");
      this.props.liveStore.changeId("container");
      this.props.history.push("/pages/contract/changeSmall");
      //储存合约类型及名字
      this.props.traderStore.contractName.set(contractKey);
  }
  scrollHeightNum () {//todo:根据滚轮的位置 判断当前那些列表在可视区 然后只加载对应列表的实时价格波动数据
    
  }
  render() { 
    return (
      <div className="contractList" style = {this.props.style}>
        <div className=" clearfix contractNum">
              <span className="fl">名称代码</span>
              <i className="fl">最新价</i>
              <b className="fl">涨跌幅</b>
              <strong className={this.state.sortName}  onClick={this.clickSor.bind(this)}></strong>  
        </div>
        <div className="contract_list" id="ha">
         
          <ul className={(this.state.listOff === 0)?"all_list":"all_list show"} id="allList" onTouchEnd={this.scrollHeightNum.bind(this)} >

              {this.props.liveStore.socket.lastJson.map((post,index) =>
                <li key={index} onClick = {this.contractShowKLine.bind(this)} data-Tname = {post.name} data-contractKey={post.key.contractKey} data-exchangeEnum = {post.key.exchangeEnum} className="clearfix">
                      <span className="fl" data-contractKey={post.key.contractKey} data-Tname = {post.name} data-exchangeEnum = {post.key.exchangeEnum}>{post.key.contractKey}</span>   
                      <i className="fl" data-contractKey={post.key.contractKey} data-Tname = {post.name} data-exchangeEnum = {post.key.exchangeEnum}>{post.ask}</i>
                      <b className="fl" data-contractKey={post.key.contractKey} data-Tname = {post.name} data-exchangeEnum = {post.key.exchangeEnum}>{post.ud}</b>
                    
                </li>
                
              )}
          </ul>
        </div>
      </div>
    );
  }
}));
export default withRouter(ContractList);

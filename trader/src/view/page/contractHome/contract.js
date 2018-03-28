//首页--数据是用mock 插件模拟的 http用的是axios 组件
import React, { Component } from 'react';
import './contract.css';
import axios from 'axios';//ajax 数据交互
import 'api/jsMock';//mock模拟数据
import { Link , withRouter} from 'react-router-dom';//router
import ReactSwipe from 'react-swipe';//swiper
import Footer from 'com/footer/footer';//footer模拟数据
import ContractList from './contractList';//合约列表 
import PubBigStock from './pubBigStock';//股票大盘
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
import pubFn from "mixin/pubFn.js";//公共函数
const Contract = inject("liveStore","traderStore")(observer(class Contract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "posts": [],//存放实时数据
      "stock":"",//搜索合约输入框名称
      "difTypeContractArr":["期货","美股","港股","数字货币","自选"],//合约品种
      "numberStockArr":["BTC","LTC","ETH","ETC","BTH","BTC合约"],//数字货币
      "numberStockArr1":["LTC","ETH","ETC","BTC","BTC合约","LTC合约"],//数字货币
      "searchArr":[{name:"我是牛人",type:1,stockShortName:"MI"},{name:"我是大牛",type:0,stockShortName:"MN"}],//搜索数据
      "colorType":"quotes",//颜色class
      "default":"0",//记录不同业务的下标  对应difTypeContractArr
      "defaults":"0",//记录不同业务的下标  numberStockArr
      "sortNum":1,//当前业务下合约排序顺序代号 
      "sortName":"consort0 fl",//className  跟sortNum 关联起来 可以方便切换不同的样式
      "searchNumOff":false,//判断是不是出搜索的列表
      style:{//最外层样式
        width:"100%",
        height:"88%",
        background: "#20212a",
      },
      pubStockFn:()=>{//根据index  切换相应的列表及内容 不一样的区域显示不一样的样式跟大小
        return (<div style={{width:"100%",height:"100%",}}>
                  <ContractList style={{width:"100%",height:"100%",}}/>
              </div>)
      },
    };
  }
  //清除输入框
  clearInput () {
    this.setState({
      stock:"",
      searchNumOff:false
    });
  }
  //搜索合约
  searchStockClick (event) {
      this.setState({stock: event.target.value});
      if (event.target.value != "") {
          this.setState({searchNumOff:true});
      } else {
          this.setState({searchNumOff:false});
      }
  }
  //点击记录index下标
  clickConList(index){//点击修改 业务下标
    this.setState({
      "default" : index,
    });

    if (index =="4") {//自选
      this.props.traderStore.typeCategory.set("0");
      localStorage.typeCategory = "0";
      this.setState({
        pubStockFn:()=>{
          return (<div style={{width:"100%",height:"100%",}}>
            <div className="optional">
                <input type="text" placeholder="期货/美股/港股/数字" value = {this.state.stock} className="fl searchStock" onChange = {this.searchStockClick.bind(this)} />
                <i></i>
                <b></b>
                <strong className = {this.state.searchNumOff ? "showClosed" : "hideClosed"} onClick = {this.clearInput.bind(this)}></strong>
            </div>
            <ContractList style={{width:"100%",height:"93%",}}/>
        </div>)
        },
      })
    } else if (index =="3") {
      //改变//改变交易类型
      this.props.traderStore.typeCategory.set("4");
      localStorage.typeCategory = "4";
      this.props.liveStore.socket.lastJson = [];
      this.props.liveStore.difContractType(4,2);
      this.setState({
        pubStockFn:()=>{
          return (<div style={{width:"100%",height:"100%",}}>
              <div style={{width:"200%",height:"9%",}}>
                <ReactSwipe className="clearfix" swipeOptions={{speed: 600}}>
                  <div>
                    {
                      this.state.numberStockArr.map((name, index) => 
                        <span className={(index==this.state.defaults)?"actives fl":"s fl"} key={index}  onClick={this.clickNumStockList.bind(this,index)}>{name}</span>
                      )
                     }
                  </div>
                  <div>
                    {
                      this.state.numberStockArr1.map((name,index) => 
                        <span className={(index+6==this.state.defaults)?"actives fl":"s fl"} key={index}  onClick={this.clickNumStockList.bind(this,index+6)}>{name}</span>
                      )
                     }
                  </div>
                </ReactSwipe>
              </div>
              <ContractList style={{width:"100%",height:"91%",}}/>
          </div>)
        },
      })
    } else if (index =="2") {
      this.props.liveStore.socket.lastJson = [];
      //改变//改变交易类型
      localStorage.typeCategory = "2";
      this.props.traderStore.typeCategory.set("2");
      this.props.liveStore.difContractType(6,2);
      this.setState({
        pubStockFn:()=>{
          return (<div style={{width:"100%",height:"100%",}}>
              <PubBigStock style={{width:"100%",height:"17.8%",}}/>
              <ContractList style={{width:"100%",height:"82.2%",}}/>
          </div>)
        },
      })
    } else if (index =="1") {
      this.props.liveStore.socket.lastJson = [];
      localStorage.typeCategory = "3";
      this.props.traderStore.typeCategory.set("3");
      this.props.liveStore.difContractType(10,1);
      this.setState({
        pubStockFn:()=>{
          return (<div style={{width:"100%",height:"100%",}}>
              <PubBigStock style={{width:"100%",height:"17.8%",}}/>
              <ContractList style={{width:"100%",height:"82.2%",}}/>
          </div>)
        },
      })
    } else {
        this.props.liveStore.socket.lastJson = [];
        this.props.liveStore.difContractType(1,0);
        //改变//改变交易类型
        localStorage.typeCategory = "1";
        this.props.traderStore.typeCategory.set("1");
        this.setState({
          pubStockFn:()=>{
            return (<div style={{width:"100%",height:"100%",}}>
                <ContractList style={{width:"100%",height:"100%",}}/>
            </div>)
          },
        })
    }
  }
  //点击记录index下标--搜索合约
  clickNumStockList (index) {
    this.setState({
      "defaults" : index,
    });
  }
  componentDidMount() {
    const liveListObject = {
      "blockID":1,
      "startIndex":0,
      "clientType":0,
      "data":[],
      "num":3,
      "modle":"MAKETDATA",
      "active":"MARKETSORT",
      "sort":"0",
      "room":1,
      "token":localStorage.token,
    };
    if(localStorage.token) {
      if (this.props.liveStore.socket.newSocket == null) {
          this.props.liveStore.socketOpen(liveListObject);
      }
      this.props.liveStore.listData();
    } else {
      this.props.history.push("/pages/contract");
    }
  }
  render() {
    return (
      <div className="home">
        <div className="homeHead">行情<i></i></div>
        <div className="sc" >
            <ReactSwipe className="clearfix sw">
              <div>
                {
                  this.state.difTypeContractArr.map((name, index) => 
                    <span className={(index==this.state.default)?"active fl":"ss fl"} key={index}  onClick={this.clickConList.bind(this,index)}>{name}</span>
                  )
                }
              </div>
            </ReactSwipe>
        </div>
        <div style = {this.state.style}>{this.state.pubStockFn()}</div>
        <Footer typeColor={this.state.colorType} />
        <div className = {this.state.searchNumOff ? "showList" : "hideList"}>
            <ul>
              {
                this.state.searchArr.map(
                    (name,index) => 
                    <li className = "clearfix" key = {index}>
                          <i className = "fl">{name.stockShortName}</i>
                          <span className = "fl">{name.name}</span>
                          <b className = {name.type ? "fr checkedOk" : "fr checkedON"}></b>
                    </li>
                )
              }
            </ul>
        </div>
      </div>
    );
  }
}));
export default withRouter(Contract);

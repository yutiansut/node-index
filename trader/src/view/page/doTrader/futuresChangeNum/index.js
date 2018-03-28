// 策略页面
import React, { Component } from 'react';
import './index.css';
import {Link,withRouter} from "react-router-dom";
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
const FuturesChangeNum = inject("traderStore","liveStore")(observer(class FuturesChangeNum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contractName : "美原油03",
      num:0,
      traderPricetype:"对手价",
      buyPrice:'',
      sellPrice:'',
    };
  }
  componentDidMount() {
    /*实时数据*/
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
    const type = this.props.traderStore.routerType.get();
    /* type 判断是从行情页进去的还是从策略页面进去的(等同于刷页面)*/
    if (type) {
      this.setState({
          num:0,
          traderPricetype:"对手价",
      });
      if(localStorage.token) {
        if (this.props.liveStore.socket.newSocket == null) {
            this.props.liveStore.socketOpen(hadicapObject);
        }
      }
      this.props.liveStore.handicapData(Key,Enum);
    } else {
      if(localStorage.token) {
        if (this.props.liveStore.socket.newSocket == null) {
            this.props.liveStore.socketOpen();
        } else {
          //从策略进来的话  需要先把socket 关闭了  
          this.props.liveStore.socket.newSocket.close();
          this.props.liveStore.socket.newSocket = null;
          this.props.liveStore.handicapNavListObj = {
            "amount":"",
            "dateTime": "",//string,日期时间
            "ask": '0.00',//double,卖出价
            "askSize": "", //int, 卖出量
            "bid": '0.00',//double,买入价
            "bidSize": '', //int，买入量
            "highPrice": '',//double,最高价
            "key": {
                "contractKey": "",//string,合约号key
                "exchangeEnum": 0 //int,交易所 枚举值
            },
            "dataType": "TICKDATA", //string,盘口实时数据
            "lastPrice": '',//double,最新价
            "lowPrice": '',//double,最低价
            "openPrice": '',//double,开盘价
            "ud": 0,//double,涨跌
            "udPer": "", //string,涨幅
            "volume": '',//long,成交量
            "closePrice": '',//double,收盘价
            "preClosePrice": '',//double,昨收盘价
            "etfIOPV": '',//double,ETF的基金份额参考净值
          };
        }
      } 
      this.setState({
        num:0,
        traderPricetype:"对手价",
      });
    }

    /*订单数据*/
    if(localStorage.token) {
      if (this.props.traderStore.socket.traderSocket == null) {
          const orderListObject = {
            "active":"ORDER",
            "room":1,
            "token":localStorage.token,
          };
          this.props.traderStore.socketOpen(orderListObject);
      } else {
        this.props.traderStore.listGet();
      }
    }
  }
  contractNameChange (event) {
      this.setState({contractName: event.target.value});
  }
  /*买涨及平仓*/
  buyClick (event) {
    this.props.traderStore.otherZoom.set("0");
    let buyPrice = document.getElementsByClassName("buy")[0];
    if (parseInt(buyPrice.innerHTML) == 0 && this.props.traderStore.isBuyClosedName.get() == "买多") {
      alert("请选择合约");
      return;
    } else {
      if (this.props.traderStore.isBuyClosedName.get() == "买多") {
          let side = "buy";
          let Key = localStorage.contractKey ;
          let Enum = localStorage.exchangeEnum;
          let num = this.props.liveStore.handicapNavListObj.lotSize;
          this.props.traderStore.madeOrder(side,Key,Enum,num);
      } else {
        if (this.props.traderStore.isChicang.get() == "0") {
            let side = "sell";
            let Key = localStorage.contractKey ;
            let Enum = localStorage.exchangeEnum;
            let num = this.props.liveStore.handicapNavListObj.lotSize;
            let idArr = [this.props.traderStore.orserId.get()];
            this.props.traderStore.closedOrder(side,num,idArr,Key,Enum);
        }
          
      } 
    }
  }
  /*买跌及平仓*/
  sellClick (event) {
    this.props.traderStore.otherZoom.set("0");
    let sellPrice = document.getElementsByClassName("sell")[0];
    if (parseInt(sellPrice.innerHTML) == 0 && this.props.traderStore.isSellClosedName.get() == "买入") {
      alert("请选择合约");
      return;
    } else {
      if (this.props.traderStore.isSellClosedName.get() == "卖空") {
        let side = "sell";
        let Key = localStorage.contractKey ;
        let Enum = localStorage.exchangeEnum;
        let num = this.props.liveStore.handicapNavListObj.lotSize;;
        this.props.traderStore.madeOrder(side,Key,Enum,num);
      } else {
        if (this.props.traderStore.isChicang.get() == "0") {
          if (this.props.traderStore.typeCategory.get()  === "1") {
              let side = "buy";
              let Key = localStorage.contractKey ;
              let Enum = localStorage.exchangeEnum;
              let num = this.props.liveStore.handicapNavListObj.lotSize;;
              let idArr = [this.props.traderStore.orserId.get()];
              this.props.traderStore.closedOrder(side,num,idArr,Key,Enum);
          } else {
              let side = "sell";
              let Key = localStorage.contractKey ;
              let Enum = localStorage.exchangeEnum;
              let num = this.props.liveStore.handicapNavListObj.lotSize;;
              let idArr = [this.props.traderStore.orserId.get()];
              this.props.traderStore.closedOrder(side,num,idArr,Key,Enum);
          }
          
        }
      }
    }
  }
  render() {
    return (
      <div className="futuresChangeNum clearfix">
          <div className = "changeNumTop clearfix">
              <div className = "fl clearfix changeNumTopLeft">
                  <div className = "clearfix changeNumTopLeftTop">
                      <i className = "fl"></i>
                      <input className = "fl" value={this.props.liveStore.handicapNavListObj.key.contractKey} type="text" onChange = {this.contractNameChange.bind(this)}/>
                      <b className = "fl"></b>
                  </div>
                  <div className = "clearfix changeNumTopLeftBot">
                      <div className = "fl clearfix changeNumTopLeftBotLeft">
                          <p className = "fl">手数</p>
                          <h4 className = "fl">{this.state.num}</h4>
                      </div>
                      <div className = "fl clearfix changeNumTopLeftBotRight">
                          <p className = "fl">价格</p>
                          <h4 className = "fl">{this.state.traderPricetype}</h4>
                      </div>
                  </div>
              </div>
              <div className = "fl changeNumTopRight">
                  <ul>
                    <li className = "clearfix">
                        <span className = "fl">新</span>
                        <h3 className = "fl">{this.props.liveStore.handicapNavListObj.lastPrice}</h3>
                        <strong className = "fl">{this.props.liveStore.handicapNavListObj.volume}</strong>
                    </li>
                     <li className = "clearfix" >
                        <span className = "fl">卖</span>
                        <h3 className = "fl">{this.props.liveStore.handicapNavListObj.bid}</h3>
                        <strong className = "fl">{this.props.liveStore.handicapNavListObj.bidSize}</strong>
                    </li>
                     <li className = "clearfix">
                        <span className = "fl">买</span>
                        <h3 className = "fl">{this.props.liveStore.handicapNavListObj.ask}</h3>
                        <strong className = "fl">{this.props.liveStore.handicapNavListObj.askSize}</strong>
                    </li>
                  </ul>
              </div>
          </div>
          <div className = "traderBtn clearfix">
              <div className = "fl traderBtnLeft" onClick = {this.buyClick.bind(this)}>
                  <p className = "buy">{this.props.liveStore.handicapNavListObj.bid}</p>
                  <h5 className = "buyName">{this.props.traderStore.isBuyClosedName.get()}</h5>
              </div>
              <div className = "fl traderBtnRight" onClick = {this.sellClick.bind(this)}>
                  <p className = "sell">{this.props.liveStore.handicapNavListObj.ask}</p>
                  <h5 className = "sellName">{this.props.traderStore.isSellClosedName.get()}</h5>
              </div>
          </div>
      </div>
    );
  }
}));
export default withRouter(FuturesChangeNum);

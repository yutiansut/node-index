// 策略页面
import React, { Component } from 'react';
import './index.css';
import pubFn from "mixin/pubFn.js";//公共函数
import {Link,withRouter} from "react-router-dom";
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
const DifOrderList = inject("traderStore","liveStore")(observer(class DifOrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrTypeChange:[{
          html:"持仓",
          clName:"fl colTY",
          type:0,
        },{
          html:"挂单",
          clName:"fl",
          type:1,
        },{
          html:"委托",
          clName:"fl",
          type:2,
        },{
          html:"成交",
          clName:"fl",
          type:3,
      },],
      type:0,
      listClickOff:false,//点击每条列表的开关
      allListOff:false,//判断点击合计切换清仓按钮开关
      firstClickOff:true,//判断是不是第一次点击列表
      stopTraderOff:false,//判断显示止盈止损  及反手按钮。
      Ind:"0",//存储点击的 index
      listA:["合约名称","多空","手数","开仓均价","浮动盈亏"],
      styleH:{"width":"20%"},
      holdListArr:["合约名称","手数","多空","开仓均价","浮动盈亏"],
      hangListArr:["合约名称","状态","买卖","价格","挂单量","挂单时间"],
      entrustList:["合约名称","状态","买卖","委托价","委托量","已成交"],
      delList:["合约名称","成交量","买卖","成交价","成交时间"],
    };
  }
  componentDidMount () {
      this.setState({
        styleH:{"width":"20%"},
        listA :this.state.holdListArr
      });
  }
  /*点击切换持仓 历史  */
  typeClick (event) {
    let typeDif = event.target.getAttribute("data-type");
    //点击打的tab  把持仓里状态改为默认  比如 平仓按钮消失  颜色消失 
    this.setState({
      listClickOff:false,
      allListOff:false,
      stopTraderOff:false,
    });
    this.props.traderStore.isSellClosedName.set("卖空");
    this.props.traderStore.isBuyClosedName.set("买多");
    this.props.traderStore.isChicang.set(typeDif);
    // this.setState({
    //   type:typeDif,
    // });
    switch (typeDif) {
      case "0" :
        this.setState({
          styleH:{"width":"20%"},
          listA :this.state.holdListArr,
          arrTypeChange:[{
              html:"持仓",
              clName:"fl colTY",
              type:0,
            },{
              html:"挂单",
              clName:"fl",
              type:1,
            },{
              html:"委托",
              clName:"fl",
              type:2,
            },{
              html:"成交",
              clName:"fl",
              type:3,
          },],
        });

      break;
      case "1" :
        this.setState({
          styleH:{"width":"16.667%"},
          listA :this.state.hangListArr,
          arrTypeChange:[{
              html:"持仓",
              clName:"fl",
              type:0,
            },{
              html:"挂单",
              clName:"fl colTY",
              type:1,
            },{
              html:"委托",
              clName:"fl",
              type:2,
            },{
              html:"成交",
              clName:"fl",
              type:3,
          },],
        });
      break;
      case "2" :
        this.setState({
          styleH:{"width":"16.667%"},
          listA :this.state.entrustList,
          arrTypeChange:[{
              html:"持仓",
              clName:"fl",
              type:0,
            },{
              html:"挂单",
              clName:"fl",
              type:1,
            },{
              html:"委托",
              clName:"fl colTY",
              type:2,
            },{
              html:"成交",
              clName:"fl",
              type:3,
          },],
        });
      break;
      case "3" :
        this.setState({
          styleH:{"width":"20%"},
          listA :this.state.delList,
          arrTypeChange:[{
              html:"持仓",
              clName:"fl",
              type:0,
            },{
              html:"挂单",
              clName:"fl",
              type:1,
            },{
              html:"委托",
              clName:"fl",
              type:2,
            },{
              html:"成交",
              clName:"fl colTY",
              type:3,
          },],
        });
      break;
    }
    /*请求订单历史数据*/
    if (this.props.traderStore.isChicang.get() == "3") {
      this.props.traderStore.historyOrder();
    }
  }
  listClick (index,name,event) { 
      //根据入口方式  判断该不该清除本地localStorage 来判断切换合约的盘口信息不（当前的点击不再发送命令）
      this.setState({
        allListOff:false,
        firstClickOff:false,
      });
      if (this.props.traderStore.routerType && this.state.firstClickOff) {
          localStorage.contractChinaName = "";
      }
      let dataTp = name.action;
      let inde = index;
      let orderId = name.orderId;
      let sym = name.symbol;
      let num = name.exchangeEnum;
      localStorage.contractKey = sym;
      localStorage.exchangeEnum = num;
      let Key = localStorage.contractKey;
      let Enum = localStorage.exchangeEnum;
      this.props.traderStore.contractName.set(name.name);
      //点击的时候把订单id存在全局
      this.props.traderStore.orserId.set(orderId);
      const hadicapObject = {
          "clientType":0,
          "contractKey":Key,
          "exchangeEnum":Enum,
          "modle":"MAKETDATA",
          "active":"SUBTICK",
          "room":1,
          "token":localStorage.token,
      };
      if(localStorage.token &&  this.props.traderStore.isChicang.get() == 0 && localStorage.contractChinaName != name.name) {
        if (this.props.liveStore.socket.newSocket != null) {
          this.props.liveStore.socket.newSocket.send(JSON.stringify(this.props.liveStore.socketData(hadicapObject)));
          localStorage.contractChinaName = name.name;
        } else {//假如是从开户进来 需要先创建新的socket  然后发送命令 
          this.props.liveStore.socketOpen();
          var self = this;
          setTimeout(function(){ // 先创建socket  再发送命令 这样不会导致创建的同时发送命令。
            const hadicapObject = {
                "clientType":0,
                "contractKey":Key,
                "exchangeEnum":Enum,
                "modle":"MAKETDATA",
                "active":"SUBTICK",
                "room":1,
                "token":localStorage.token,
            };
            self.props.liveStore.socket.newSocket.send(JSON.stringify(self.props.liveStore.socketData(hadicapObject)));
            localStorage.contractChinaName = name.name;
          },800);
        }
      }
      //根据otherZoom 判断点击的是list还是其它区域，来切换是 买入 还是 平仓按钮
      this.props.traderStore.otherZoom.set("1");
      //开关判断每条list是不是被点击或者再次点击
      if (this.state.listClickOff) {
          this.setState({
            listClickOff:false,
            stopTraderOff:false,
          });
      } else {
          this.setState({
            listClickOff:true,
            stopTraderOff:true,
          });
      }
      //获取当前元素的index
      this.setState({
          Ind:inde,
      });
      //判断index 来确定哪条list变颜色？？？？？？-----
      if (inde == index && !this.state.listClickOff) {
        this.setState({
            listClickOff:true,
            stopTraderOff:true,
        });
      } else {
        this.setState({
          listClickOff:false,
          stopTraderOff:false,
        });
      }
      //点击判断平仓按钮位置
      if (this.props.traderStore.isChicang.get() == "0") {
        if (dataTp == "buy") {
          if (!this.state.listClickOff) {
            this.props.traderStore.isSellClosedName.set("平仓");
            this.props.traderStore.isBuyClosedName.set("买多");
          } else {
            this.props.traderStore.isSellClosedName.set("卖空");
            this.props.traderStore.isBuyClosedName.set("买多");
          }
        } else {
          if (!this.state.listClickOff) {
            this.props.traderStore.isBuyClosedName.set("平仓");
            this.props.traderStore.isSellClosedName.set("卖空");
          } else {
            this.props.traderStore.isSellClosedName.set("卖空");
            this.props.traderStore.isBuyClosedName.set("买多");
          }
        }
      }
  }
  /*点击合计出清仓按钮*/
  allListClick () {
    this.setState({
      listClickOff:false,
    });
    if (this.props.traderStore.isChicang.get() == "0") {
      if (this.state.allListOff) {
          this.setState({
            allListOff:false,
          });
      } else {
          this.setState({
            allListOff:true,
          });
      }
    } else {
      this.setState({
        allListOff:false,
      });
    }
  }
  /*点击清仓按钮 平仓所有订单*/
  allListClosed () {
    if (this.props.traderStore.isChicang.get() == "0" && this.state.allListOff && this.props.traderStore.socket.holdList.length>=1) {
      let side = "sell";
      let type = 1;
      let Key = localStorage.contractKey ;
      let Enum = localStorage.exchangeEnum;
      let num = 1;
      let idArr = this.props.traderStore.orserIdArr;
      this.props.traderStore.clearClosedOrder(idArr);
    } else {
      if (this.props.traderStore.socket.holdList.length == 0) {
        alert("没订单");
      } else {
        alert("有异常");
      } 
    }
  }
  /*反手*/
  backHandClick () {
    if (this.props.traderStore.isChicang.get() == "0" && this.props.traderStore.socket.holdList.length>=1) {
      let idArr = [this.props.traderStore.orserId.get()];
      this.props.traderStore.backHand(idArr);
    }
  }
  render() {
    //根据当前的type 来判断显示内容 是持仓 还是委托 挂单  历史
    if (this.props.traderStore.isChicang.get() == "0") {
      var arr = this.props.traderStore.socket.holdList;
      var arrL = this.props.traderStore.socket.holdList.length;
      var styleH = {"display":"none"};
      var styleO = {"display":"block"};
    } else if (this.props.traderStore.isChicang.get() == "1") {
      var arr = this.props.traderStore.socket.hangList;
      var arrL = this.props.traderStore.socket.hangList.length;
      var styleH = {"display":"block"};
      var styleO = {"display":"none"};
    } else if (this.props.traderStore.isChicang.get() == "2") {
      var arr = this.props.traderStore.socket.entrustList;
      var arrL = this.props.traderStore.socket.entrustList.length;
      var styleH = {"display":"block"};
      var styleO = {"display":"none"}; 
    } else if (this.props.traderStore.isChicang.get() == "3") {
      var arr = this.props.traderStore.socket.historyList;
      var arrL = this.props.traderStore.socket.historyList.length;
      var styleH = {"display":"none"};
      var styleO = {"display":"block"};
    }
    //列表的数量 来判断 合计dom 定位的位置
    let style = {
      top:1.06*arrL+"rem",
      left:"0",
    }
    return (
      <div className="difOrderList">
          <ul className = "clearfix difOrderListTop">
            {
              this.state.arrTypeChange.map(
                (Hname,index) =>
                <li className = {Hname.clName} onClick = {this.typeClick.bind(this)} data-type = {Hname.type} key = {index}>{Hname.html}</li>
              )
            }
          </ul>
          <ul className = "clearfix difOrderListPro">
            {
              this.state.listA.map(
                (Hname,index) =>
                <li className = "fl" style = {this.state.styleH} key = {index}>{Hname}</li>
              )
            }
          </ul>
          <div className = "allListZoomF">
            <ul className = "allListZoom">
                {
                  arr.map(
                    (name,index) =>
                    <li className = {index == this.state.Ind ? (this.state.listClickOff && this.props.traderStore.otherZoom.get() == "1" ? "clearfix liCol" : "clearfix") :"clearfix"}  key = {index}  onClick = {this.listClick.bind(this,index,name)}>
                        <a  className = "fl siglelistName" href="javascript:;">{pubFn.replaceStr(name.name,3)}</a>
                        <a  style = {styleO} className = "fl siglelistNum" href="javascript:;">{name.quantity}</a>
                        <a  style = {styleH} className = "fl siglelistNum" href="javascript:;" >{name.state}</a>
                        <a  className = {name.action == "sell" ? "fl siglelistBlNum" : "fl siglelistType"}>{name.action}</a>
                        <a  className = "fl siglelistPrice" href="javascript:;">{name.price}</a>
                        <a  style = {styleO} className = {name.benefit < 0 ? "fl siglelistBlNum" : "fl siglelistType"} href="javascript:;" >{this.props.traderStore.isChicang.get() == "3" ? pubFn.replaceStr(name.dealTime,6) : name.benefit+name.currency}</a>
                        <a  style = {styleH} className = "fl siglelistNum" href="javascript:;" >{name.quantityB}</a>
                        <a  style = {styleH} className = "fl siglelistNum" href="javascript:;" >{name.quantityC}</a>
                    </li>
                  )
                  }
            </ul>
            <div style = {style} className = "totalNum" onClick = {this.allListClick.bind(this)}>{"合计("+arrL+")"}</div>
          </div>
          <div className = {this.state.allListOff ? "allClosedBtn1" : "allClosedBtn"} onClick = {this.allListClosed.bind(this)}>账户清仓</div>
          <div  className = {this.state.stopTraderOff ? "Backhand Bshow" : "Backhand"} >
              <b className = "fl">止盈止损</b>
              <i className = "fl" onClick ={this.backHandClick.bind(this)}>反手</i>
          </div>
      </div>
    );
  }
}));
export default withRouter(DifOrderList);




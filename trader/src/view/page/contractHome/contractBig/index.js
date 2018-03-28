//横屏行情页面
import React, { Component } from 'react';
import './index.css';
import DrawPic from 'mixin/drawpic';//画图 
import LastDataBig from './lastData.js';//实时数据
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
// 取出数组中最大值 
Array.max = function( array ){
 return Math.max.apply( Math, array );
};
// 取出数组中最小值 
Array.min = function( array ){
 return Math.min.apply( Math, array ); 
};
const ContractBig = inject("contractDataStore","contractStore","liveStore")(observer(class ContractBig extends Component {
  constructor(props){
      super(props)
      this.state = {
        contractName:"美原油",
        contractListArr:[{//不同行情k线数据按钮样式 内容 自定义属性等数组
          "widthNum":{width:"8.33333%"},
          "listHtml":"分时",
          "clName":"fl",
          "name":"5M0"
          },{
            "widthNum":{width:"8.33333%"},
            "listHtml":"季K",
            "clName":"fl",
            "name":"5D"
          },{
            "widthNum":{width:"8.33333%"},
            "listHtml":"日K",
            "clName":"fl",
            "name":"1D"
          },{
            "widthNum":{width:"8.33333%"},
            "listHtml":"周K",
            "clName":"fl",
            "name":"1W"
          },{
            "widthNum":{width:"8.33333%"},
            "listHtml":"月K",
            "clName":"fl",
            "name":"1MO"
          },{
            "widthNum":{width:"8.33333%"},
            "listHtml":"年K",
            "clName":"fl",
            "name":"1Y"
          },
          {
            "widthNum":{width:"8.33333%"},
            "listHtml":"1分",
            "clName":"fl",
            "name":"1M"
          },
          {
            "widthNum":{width:"8.33333%"},
            "listHtml":"5分",
            "clName":"fl",
            "name":"5M"
          },
          {
            "widthNum":{width:"8.33333%"},
            "listHtml":"15分",
            "clName":"fl",
            "name":"15M"
          },
          {
            "widthNum":{width:"8.33333%"},
            "listHtml":"30分",
            "clName":"fl",
            "name":"30M"
          },
          {
            "widthNum":{width:"8.33333%"},
            "listHtml":"60分",
            "clName":"fl",
            "name":"1H"
          },{
            "widthNum":{width:"8.33333%"},
            "listHtml":"全部",
            "clName":"fl",
            "name":""
          }
        ], 
        marketIndicatorsList:[//行情数据数组 样式位置 自定义属性等
          {"listHtml":"MA",
          "clName":"colYellow",
          "name":"MA"},
          {"listHtml":"BOLL",
          "clName":"",
          "name":"BOLL"},
          {"listHtml":"EMA",
          "clName":"",
          "name":"EMA"},
          {"listHtml":"成交量",
          "clName":"volueM colYellow",
          "name":"VOLUEM"},
          {"listHtml":"MACD",
          "clName":"",
          "name":"MACD"},
          {"listHtml":"KDJ",
          "clName":"",
          "name":"KDJ"},
          {"listHtml":"REI",
          "clName":"",
          "name":"RSI"},
          {"listHtml":"DMI",
          "clName":"",
          "name":"DMI"},
          {"listHtml":"OBV",
          "clName":"",
          "name":"OBV"},
          {"listHtml":"设置",
          "clName":"",
          "name":""}
        ],
        style:{//横屏其实是强制展示的 需要用到 h5里的rotate 把页面转换90deg。
          width:  document.documentElement.clientHeight + "px",
          height : document.documentElement.clientWidth + "px",
          top : (document.documentElement.clientHeight-document.documentElement.clientWidth)/2 + "px",
          left : 0-(document.documentElement.clientHeight-document.documentElement.clientWidth)/2 + "px",
          transform:"rotate(90deg)"
        }         
      };
  }
  clickMarket (event) {
    
    const ownName = event.currentTarget.getAttribute('data-ownName');
    let json = {
      type:this.props.contractStore.contractString.get(),
      indexType:ownName
    }
    if (this.props.contractStore.contractString.get() != "5M0") {
      this.props.liveStore.historyIndicatorsData(json);
    } else {
       return;
    }
    
  }
  componentDidMount () {
    this.props.liveStore.changeId("container1");
  }
  //dom创建
  render() {
    return (
      <div className="contractBig" style={this.state.style}>
        <LastDataBig lastPric={this.state.lastPric} contractName={this.state.contractName}/>
        <DrawPic style={this.state.style} contractListArr={this.state.contractListArr}/>
        <div className="marketIndicators">
            <ul className="marketIndicatorsList">
              {this.state.marketIndicatorsList.map((post,index) =>
                <li key={index} data-ownName={post.name} className={post.clName}  onClick={this.clickMarket.bind(this)}>
                  {post.listHtml}
                </li>
              )}
            </ul>
        </div> 
      </div>

    );
  }
}));
export default ContractBig;
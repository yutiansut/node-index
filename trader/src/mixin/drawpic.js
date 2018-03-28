//主要是历史数据画图 现在数据是从子级socket 回传过来的（后台数据http没有）TODO：接后台的http数据后 改为mobx管理 而不是子级传递数据
import React, { Component } from 'react';
// import ChartHc from './hcFunction';//highstock 第三方画图软件
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
// import pubFn from "mixin/pubFn.js";//公共函数
// localStorage.contractType = "5M0";//默认的当前合约信息的类型 默认是分时图 TODO：用mobx管理取代localStorage
const DrawPic = inject("contractStore","contractDataStore","liveStore")(observer(class DrawPic extends Component {
  constructor (props) {
      super(props)
      this.state = {
          newWbsocket:null,//父组件创建socket 通过props 传递给子级 ，做了两层子级（ChartsView/Tradersocket）
          newD:null,////子组获取到的数据通过callback传给父级（ChartsView/Tradersocket）
       		newPicType:null,
          drawOff:false,//Highstock是否画新的图
          initData:false,//判断数据是否接受完成且画图完成
          clickOff:0,
          id:this.props.contractListMinuteArr ? "container" : "container1",
          dataArr:[],
      };
  }
  //历史数据从子级接过来 处理数据
  componentDidMount () {
    let json = {type:"5M0",};
    this.props.liveStore.historyKLineData(json);
  }
  componentWillUnmount() {//生命周期结束把定时器关掉
      clearInterval(this.inter);
  }
  //点击切换不同图
  clickList (event) {//event 是事件对象 可以获取当前的元素 或者冒泡附件元素 event.target  或者用react 里的ref也可以修订this的指向。
    
      const ownName = event.currentTarget.getAttribute('data-ownName');
      this.props.contractStore.isClickChange(ownName);
      if(ownName!=="" ){
        if(ownName!=="" && ownName!=="5D" && ownName!=="1MO" && ownName!=="1Y"){
          if (this.state.drawOff) { //确保每项点击后数据获取到  才能点击下一个  
            return;
          };
          this.setState({drawOff:true});
          let p = event.currentTarget.parentNode.parentNode.getElementsByTagName("li");
          for(let i =0,pl= p.length;i<pl;i++) {
              p[i].style.color="#f7f7f6";
          }
          if(ownName === "5M0"){      
              this.setState({clickOff:0}); 
          }
          event.currentTarget.style.color = "yellow";
          // const MHTime3 = new Date();
          // const MHY = MHTime3.getFullYear();
          // const MHMO = MHTime3.getMonth() + 1;
          // const MHDa = MHTime3.getDate();
          // const MHh = MHTime3.getHours();
          // const MHMI = MHTime3.getMinutes();
          // const MHSe = MHTime3.getSeconds();
          if (ownName === "5M") {      
              var json = {
                type:ownName,
              };
          } else if (ownName === "1M") {
              var json = {
                type:ownName,
              };
          }else if (ownName === "15M") {
              var json = {
                type:ownName,    
              };
          }else if (ownName === "30M") {
              var json = {
                type:ownName,
              };
          } else if (ownName === "5M0") {
              var json = {
                type:ownName,
              };
          } else {
            var json = {
              type:ownName,
            };
          }
          this.props.liveStore.historyKLineData(json);
          this.setState({
            drawOff:false,
            clickOff:0
          });
        }
      }else{//切换的不同行情展示时  把k线列表隐藏
         if(this.state.clickOff==0){
            this.setState({clickOff:1});
         }else{
            this.setState({clickOff:0});
         }
      } 
         
  }
  //dom创建
  render () {
    if(this.props.contractListMinuteArr){
      var style={
          width: document.documentElement.clientWidth+"px",
          height:document.documentElement.clientHeight*0.48+"px"
      }
    }else{
      var style={
        background:"#20212a",
        width: document.documentElement.clientHeight*0.92+"px",
        height:document.documentElement.clientWidth*0.82+"px"
      }
    }
    return (
      <div>
          <ul className="clearfix indicatorsList" id="contractList">
            {this.props.contractListArr.map((post,index) =>
              <li onClick={this.clickList.bind(this)} key={index} className={post.clName} data-ownName={post.name} style={post.widthNum}>
                {typeof post.listHtml == "function" ? post.listHtml() : post.listHtml}
              </li>
            )}
          </ul>
          {/*判断不同情况下出现不同的HTML*/}
          {this.props.contractListMinuteArr ?
            (<ul className={(this.state.clickOff==0)?"minuteKList":"minuteKList show"} id="minuteKList">
              {this.props.contractListMinuteArr.map((post,index) =>
                <li onClick={this.clickList.bind(this)} key={index} data-ownName={post.name}>
                  {post.listHtml}
                </li>
              )}
            </ul>) : ("")
          }	 
          <div id={this.props.contractListMinuteArr ? "container" : "container1" } style={style} >

          </div>
      </div>

    );
  }
}));
export default DrawPic;
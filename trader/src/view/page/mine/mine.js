// 我的页面 
import React, { Component } from 'react';
import './mine.css';
import Footer from 'com/footer/footer';//footer模拟数据
import IsDisLogin from './isDisLogin';//是否登录组件
class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "colorType":"myPort",//传给footer
      
      moreInfoListArr:[//个人信息其它操作列表 内容 及对应的图表 用的是className控制 循环添加对应的className
      {
        nav:"资产",
        classN:"assets"
      },
      {
        nav:"策略记录",
        classN:"plotNotes"
      },
      {
        nav:"好友",
        classN:"friends"
      },
      {
        nav:"策略",
        classN:"plots"
      },
      {
        nav:"推广",
        classN:"spreat"
      },
      {
        nav:"设置",
        classN:"set"
      },
      {
        nav:"模拟交易",
        classN:"simulationTrader"
      },
      ]
    };
  }
  render() {
    return (
      <div className="mineRute">
          <div className="homeHead hB">我的<b></b><strong></strong></div>
          <IsDisLogin  myInfo={this.state.myInfo} />
          <ul className="moreInfoList">
              {this.state.moreInfoListArr.map((name,index)=>
                  <li key={index} className="clearfix">
                    <i className={name.classN}></i>
                    <span>{name.nav}</span>
                  </li>
              )}
          </ul>
          <Footer typeColor={this.state.colorType} />
      </div>
    );
  }
}

export default Mine;

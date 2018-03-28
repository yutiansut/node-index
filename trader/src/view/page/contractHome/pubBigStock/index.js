//股票大盘组件
import React, { Component } from 'react';
import './index.css';
import axios from 'axios';//ajax 数据交互
import 'api/bigStockDataMock.js';//mock模拟数据
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
const PubBigStock = inject("liveStore")(observer(class PubBigStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "posts": [],
    };
  }
  componentDidMount() {
    let self=this;//定时器里的this是全局的 react 不是当前的目标 需要转换一下。
    this.interval = setInterval(function(){
      axios.get('/stock/index').then(res => {//http 接口
        self.setState({ "posts":res.data.articles});
      });
    },3000);
    axios.get('/stock/index').then(res => {//先产生默认值  再开定时器刷新 此处模拟的是socket数据 首页的合约列表需要展示实时价格的波动
       this.setState({ "posts":res.data.articles});
    });
  }
  componentWillUnmount() {//生命周期结束把定时器关掉
    clearInterval(this.interval);
    this.setState({ "posts":[]});
  }
  render() { 
    return (
      <div className="bigStock">
        <ul className = "clearfix">
            {this.state.posts.map((name,index)=>
              <li key={index} className = "fl" style = {Number(index) === 2 ? {border:"none"} :{}}>
                <p>{name.bigStock_name}</p>
                <span>{name.bigStockPrice}</span>
                <div className = "clearfix">
                    <i className = "fl" >{name.bigStockScale}</i>
                    <b className = "fl">{name.bigStockChange}</b>
                </div>
              </li>
            )}
        </ul>
      </div>
    );
  }
}));
export default PubBigStock;

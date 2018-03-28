// 总路由管理页面
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';
import Game from 'view/page/game/game';//游戏
import Plot from 'view/page/plot/plot';//策略
import Live from 'view/page/live/live';//直播
import Mine from 'view/page/mine/mine';//我的
import PlotPage from 'view/page/plot/router/plotRouter';//plot 子页面   
import ContractR from 'view/page/contractHome/router/contractRouter.js';//CONTRACT 子页面
import DoTrader from "view/page/doTrader";//交易页面
class Pages extends React.Component {
   constructor(props){
      super(props)
      this.state = {//页面适配 根据手机大小来给定宽高
        style:{
          width:  document.documentElement.clientWidth + "px",
          height : document.documentElement.clientHeight + "px",
        }         
      };
    }
    render() {
      return (
        <div className = "pages">
            <Switch>
              <Route path="/pages/contract" component={ContractR} />
              <Route path="/pages/game" component={Game}/>
              <Route path="/pages/plot" component={PlotPage}/>
              <Route path="/pages/live" component={Live}/>
              <Route path="/pages/mine" component={Mine}/>
              <Route path="/pages/dotrader" component={DoTrader}/>
              <Redirect to="/pages/contract"></Redirect>
            </Switch>
        </div>
      )

  }
}

export default Pages;

// 总路由管理页面
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';
import Plot from 'view/page/plot/plot';//策略
//开户子页面
import HeadFirst from "view/page/plot/plotFirst/plotFirst";
import HeadSecond from "view/page/plot/plotSecond/plotSecond";
import HeadThird from "view/page/plot/plotThird/plotThird";
class PlotPage extends React.Component {
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
        <div className = "plotPages">
            <Switch>
              <Route exact path="/pages/plot" component={Plot}/>
              <Route path="/pages/plot/plotFirst" component={HeadFirst} />
              <Route path="/pages/plot/plotSecond" component={HeadSecond} />
              <Route path="/pages/plot/plotThird" component={HeadThird} />
              <Redirect to="/pages/plot"></Redirect>
            </Switch>
        </div>
      )
  }
}
export default PlotPage;

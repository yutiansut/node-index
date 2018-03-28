// 总路由管理页面
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';
import 'style/index.css';
import MainLogin from 'view/page/login/router/mainLogin.js';//登录注册页
import Pages from 'view/page/router/pages.js';//5个主要页面
class RouterAll extends React.Component {
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
        <div className="page-wrapper" style={this.state.style}>
          <Switch>
            <Route path="/mainLogin" component={MainLogin}></Route>
            <Route path="/pages" component={Pages}></Route>
            <Redirect to="/mainLogin"></Redirect>
          </Switch>
        </div>
      )
  }
}
export default RouterAll;

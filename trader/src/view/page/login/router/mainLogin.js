//注册页面
import React, { Component } from 'react';
import 'view/page/login/index.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom';
import Entrance from 'view';//入口页
//登录注册子页面
import Register from "view/page/login/register/registered";
import Login from "view/page/login/login/login";
import Verification from "view/page/login/verificationCode/verificationCode";
import ChangePw from "view/page/login/changePw/changePw";
import NewPw from "view/page/login/newPw/newPw";
class MainLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  render() { 
    return (
      <div className="mainLogin" >
        <Switch>
            <Route path="/mainLogin/home" component={Entrance} />
            <Route path="/mainLogin/register" component={Register}></Route>
            <Route path="/mainLogin/login" component={Login} ></Route>
            <Route path="/mainLogin/changePw" component={ChangePw}></Route>
            <Route path="/mainLogin/newPw" component={NewPw}></Route>
            <Route path="/mainLogin/verification" component={Verification}></Route>
            <Redirect  to="/mainLogin/home" ></Redirect>
        </Switch>
      </div>
    );
  }
};
export default MainLogin;

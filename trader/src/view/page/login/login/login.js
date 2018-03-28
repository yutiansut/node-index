//登录页面
import React, { Component } from 'react';
import './login.css';
import HttpP from "mixin/httpPub.js";//公共http
import { Link,withRouter } from 'react-router-dom';//router
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
const Login = inject("loginStore")(observer(class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        telephoneNumber:"",
        passwordNav:""
    }
  }
  //跳转到注册
  clickReg () {
    this.props.history.push("./register");
  }
  //跳转到修改密码
  forgetPw () {
    this.props.history.push("./newPw");
  }
  //登录输入框信息判断
  handleChangeTel (event) {
    this.setState({telephoneNumber: event.target.value});
  }
  handleChangePw (event) {
    this.setState({passwordNav: event.target.value});
  }
  //登录判断输入是否正确 接口调试 正确后再跳转
  myFunction() {
    const telReg = /^1[34578]\d{9}$/g;
    const mypasswordReg = /^([0-9a-zA-Z]|[!@#$%^&*]){6,24}$/g;
    if (this.state.telephoneNumber == "" || this.state.passwordNav == "") {
      alert("手机号或者密码不能为空");
    }else {
      let self = this;
      if(telReg.test(this.state.telephoneNumber) && mypasswordReg.test(this.state.passwordNav)) {
        console.log(this.state.telephoneNumber)
        HttpP.NN_LoginP({"phoneNumber":this.state.telephoneNumber,"userPassword":this.state.passwordNav}).then(
          (res) =>{
            if(!res.result){
              alert(res.message)
            }else{
              // console.log(res)
              localStorage.token =  res.resultData.token;
              // self.props.loginStore.isDisLogin("1");
              self.props.loginStore.loginOkAc(res.resultData);
              self.props.history.push("/pages/contract");
            }
          }
        ).catch(
          (err) =>{
            alert("请求失败");
          }
        );
      } else {
          if(!(mypasswordReg.test(this.state.passwordNav))) {
            alert("输入密码有误！");
          } 
          if(!(mypasswordReg.test(this.state.telephoneNumber))) { {
            alert("输入手机号有误！");
          }
        }
      }
    }
  }
  backBtn () {
    this.props.history.goBack();
  }
  isNullClick () {
    this.setState({telephoneNumber: ""});
  }
  render() { 
    return (
      <div className="register">
          <div className="regHead"><i onClick = {this.backBtn.bind(this)}></i>登录</div>
          <div className="regLogol"></div>
          <div className="regInput">
              <div className="clearfix regPhNum">
                <span className="fl difCountry">+86</span>
                <b className="fl difCountryChoice">∨</b>
                <input type="telephone" placeholder="手机号" className="fl telephoneNumber" value={this.state.telephoneNumber} onChange={this.handleChangeTel.bind(this)} />
                <i className="fl difCountryClosed" onClick = {this.isNullClick.bind(this)}></i>
              </div>
              <div className="clearfix regplacePh">
                <span className="fl difCountry">密码</span>
                <input type="password" placeholder="6-24位数字英文或字母" className="fl passwordNav" value={this.state.passwordNav} onChange={this.handleChangePw.bind(this)} />
              </div>
              <p style={{display:"block"}} className="sureReg colY" onClick = {this.myFunction.bind(this)}>登录</p>
              <div className="otherBtn clearfix">
                  <span className="fl" onClick = {this.clickReg.bind(this)}>手机注册</span>
                  <span className="fr" onClick = {this.forgetPw.bind(this)}>忘记密码</span>
              </div>
              <div className="appLogin clearfix">
                  <span className="fl qq"></span>
                  <span className="fr Wchart"></span>
              </div>
          </div>
      </div>
    );
  }
}));
export default withRouter(Login);

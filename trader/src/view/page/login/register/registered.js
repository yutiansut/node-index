//注册页面
import React, { Component } from 'react';
import './registered.css';
import { withRouter , Prompt } from 'react-router-dom';//router
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
import axios from 'axios';//ajax 数据交互 开户进程数据
const Register = inject("loginStore")(observer(class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      claNma:"fl checkeboxF",
      telephoneNumber:"",
      passwordNav:"",
      isAgreeChecket:"0"
    }
  }
  //登录输入框信息判断
  handleChangeTel (event) {
    this.setState({telephoneNumber: event.target.value});
  }
  handleChangePw (event) {
    this.setState({passwordNav: event.target.value});
  }
  handleChangeChecket (event) {
    if(event.target.checked){
      this.setState({
        isAgreeChecket: "1",
        claNma:"fl checkeboxF checkedIs"
      });
    } else {
      this.setState({
        isAgreeChecket: "0",
        claNma:"fl checkeboxF"
      });
    }
  }
  backBtn () {
    this.props.history.goBack();
  }
  clickVer () {
    const telReg = /^1[34578]\d{9}$/g;
    const mypasswordReg = /^([0-9a-zA-Z]|[!@#$%^&.*]){6,24}$/g;
    if(this.state.isAgreeChecket == "0") {
            alert("请勾选！");
    }else{
      if (this.state.telephoneNumber == "" || this.state.passwordNav == "") {
        alert("手机号或者密码不能为空");
      }else {
        let self = this;
        if(telReg.test(this.state.telephoneNumber) && mypasswordReg.test(this.state.passwordNav)) {
          this.props.history.push("./verification?phoneNumber="+this.state.telephoneNumber+"&passwordNav="+this.state.passwordNav);
        } else {
            if(!(mypasswordReg.test(this.state.passwordNav))) {
              alert("输入手机号或密码有误！");
            }
        }
      }
    }
  }
  render() { 
    return (
      <div className="register">
          <div className="regHead">
          <i onClick = {this.backBtn.bind(this)}>
          </i>注册账号</div>
          <div className="regLogol"></div>
          <div className="regInput">
              <div className="clearfix regPhNum">
                <span className="fl difCountry">+86</span>
                <b className="fl difCountryChoice">∨</b>
                <input type="telephone" placeholder="手机号" className="fl telephoneNumber" onChange = {this.handleChangeTel.bind(this)} />
                <i className="fl difCountryClosed"></i>
              </div>
              <div className="clearfix regplacePh">
                <span className="fl difCountry">密码</span>
                <input type="password" placeholder="6-24位数字英文或字母" className="fl passwordNav"  onChange = {this.handleChangePw.bind(this)} />
              </div>
              <div className="sureReg" onClick = {this.clickVer.bind(this)}>确认注册</div>
              <div className="isDisAgree clearfix">
                <div className={this.state.claNma} id="checkebox" ref={inpF => this.inpF = inpF}>
                  <input type="checkbox" className="isdisChecked" onChange = {this.handleChangeChecket.bind(this)} />
                </div>
                <span className="fl">我已经阅读并同意</span>
                <b className="fl">《服务条款与隐私权政策》</b>
              </div>
          </div>
      </div>
    );
  }
}));
export default withRouter(Register);

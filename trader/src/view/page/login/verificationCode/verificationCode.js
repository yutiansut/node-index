//登录页面
import React, { Component } from 'react';
import './verificationCode.css';
import { Link, withRouter , Prompt } from 'react-router-dom';//router
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
import HttpP from "mixin/httpPub.js";
import pubFn from "mixin/pubFn.js";
const Verification = inject("loginStore")(observer(class Verification extends Component {
  constructor(props) {
    super(props);
    this.state = {
        count : "获取验证码",
        countType:"fl codeTime",
        mobile:"",
    }
  }
  clickRegOk () {
    const reg = /^[0-9]{6}$/g;
    const self = this;
    let phNum = pubFn.GetQueryString("phoneNumber");
    let userPw = pubFn.GetQueryString("passwordNav");
    this.setState({
      phoneNumber:phNum
    });
    if(phNum && userPw){ 
      if (this.state.mobile == "") {
        alert("验证码不能为空！")
      } else {
        if(reg.test(this.state.mobile)){
          HttpP.NN_RegP({"phoneNumber":phNum,"userPassword":userPw,"mobile":self.state.mobile}).then(
            (res) =>{
              if(!res.result){
                alert(res.message)
              }else{
                localStorage.token = res.resultData.token;
                clearInterval(self.tel);
                self.props.loginStore.loginOkAc(res.resultData);
                self.props.history.push("/pages/contract");
              }
            }
          ).catch(
            (err) =>{
              alert("请求失败");
            }
          );
        }else{
          alert("验证码错误！")         
      }
    }
  }}
  clickBackReg () {
    this.props.history.goBack();
  }
  clickGetVerficationCode () {
    this.setState({
        count: 60
    });
    const self = this;
    this.tel = setInterval(function(){
      self.setState((prevState) => ({
        count: prevState.count -1
      }));
      if(self.state.count<=0){
        clearInterval(self.tel);
        self.setState({
          count:"重新发送",
          countType:"fl codeTimeY"
        });
      } 
    },1000);
    let phNum = pubFn.GetQueryString("phoneNumber"); 
    if(phNum && typeof (this.state.count) != "number"){
      HttpP.NN_VerficationCodeP({"mobile":phNum,"type":3}).then(
        (res) =>{
          if(!res.result){
            alert(res.message);
            if (res.message == "该手机号已注册！") {
              clearInterval(self.tel);
              self.setState({
                count:"重新发送",
                countType:"fl codeTime"
              });
            }
          }else{
            // console.log(res);
          }
        }
      ).catch(
        (err) =>{
          alert("请求失败");
        }
      );
    }
    
  }
  //登录输入框信息判断
  handleChangeCoded (event) {
    this.setState({mobile: event.target.value});
  }
  render() { 
    return (
      <div className="register">
          <div className="regHead">
            <i onClick = {this.clickBackReg.bind(this)}></i>
            验证手机号
          </div>
          <div className="verfiCode">
              <div className="clearfix">
                    <div className="verfiCodeInput clearfix fl">
                        <span className="fl difCountry">验证码：</span>
                        <input type="telephone" placeholder="请输入验证码" className="fl codeNum" onChange = {this.handleChangeCoded.bind(this)} />
                    </div>
                    <div className={this.state.countType} onClick = {this.clickGetVerficationCode.bind(this)}>{this.state.count}</div>
              </div>
              <p>已发送短信至191585442255</p>
          </div>
          <div className="verification">
             <p className="roteContract" ref={regOk => this.regOk = regOk}  onClick = {this.clickRegOk.bind(this)}>确认注册</p> 
          </div>
      </div>
    );
  }
}));
export default withRouter(Verification);

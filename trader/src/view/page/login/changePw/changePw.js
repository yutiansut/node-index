//登录页面
import React, { Component } from 'react';
import './changePw.css';
import { withRouter } from 'react-router-dom';//router
import HttpP from "mixin/httpPub.js";//公共http
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
import pubFn from "mixin/pubFn.js";
const ChangePw = inject("loginStore")(observer(class ChangePw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      default:-1,
      pwTypeList:[{
        nameHtml:"弱"
      },{
        nameHtml:"中"
      },{
        nameHtml:"强"
      }],
      surePwTopValue:"",
      surePwBottValue:""
    }
  }
  clickBackLog () {
    this.props.history.goBack();
  }
   clickVerfiCode () {
    if(this.state.surePwBottValue ===  this.state.surePwTopValue){
      let tel = pubFn.GetQueryString("phoneNumber");
      let mob = pubFn.GetQueryString("mobile");
      const self = this;
      HttpP.NN_ChangePwP({"phoneNumber":tel,"userPassword":this.state.surePwBottValue,mobile:mob}).then(
          (res) =>{
            if(!res.result){
              alert(res.message);
              if (res.message == "手机号未注册!") {
                clearInterval(self.tel);
                self.setState({
                  count:"发送短信验证码",
                  countType:"fl verficaNewBtn"
                });
                return;
              }
            }else{
              self.props.history.push("/pages/contract");
            }
          }
      ).catch(
        (err) =>{
          alert("请求失败");
        }
      );
    } else {
      alert("两次密码不一致！");
    }
    
  }
  surePwType (event) {
    let strongReg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
    let MidReg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
    let weakReg = /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/;
    if (event.target.value.length>=6) {
      if (strongReg.test(event.target.value)) {
        this.setState({
          default:2,
        });
      } else if (MidReg.test(event.target.value)) {
        this.setState({
          default:1,
        });
      } else if(weakReg.test(event.target.value)) {
        this.setState({
          default:0,
        });
      } else {
        this.setState({
          default:-1,
        });
      }
    } else {
      this.setState({
        default:-1,
      });
    }
    this.setState({surePwTopValue: event.target.value});
  }
  surePwValue (event) {
    this.setState({surePwBottValue: event.target.value});
  }
  render() { 
    return (
      <div className="register">
          <div className="regHead"><i onClick = {this.clickBackLog.bind(this)}></i>修改密码</div>
          <div className="changePw">
            <input type="password" placeholder="请输入密码" className="fl mewPw" onChange = {this.surePwType.bind(this)} />
            <ul className="clearfix pwType">
              {
                this.state.pwTypeList.map((name, index) => 
                  <li className={(index==this.state.default) ? "liCol" : ""}  key={index}>{name.nameHtml}</li>
                )
              }
            </ul>
            <input type="password" placeholder="请再次输入新密码" className="fl mewPw" onChange = {this.surePwValue.bind(this)} />
          </div>
          <div className="verification">
             <p className="roteContract" onClick={this.clickVerfiCode.bind(this)}>确认</p> 
          </div>
      </div>
    );
  }
}));
export default withRouter(ChangePw);

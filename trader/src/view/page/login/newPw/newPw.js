//登录页面
import React, { Component } from 'react';
import './newPw.css';
import HttpP from "mixin/httpPub.js";
import { withRouter } from 'react-router-dom';//router
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
const NewPw = inject("loginStore")(observer(class NewPw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count : "发送短信验证码",
      co:60,
      default:false,
      countType:"fl verficaNewBtn",
      phoneNumber:"",
      mobile:"",
    }
  }
  clickBackChange () {
    this.props.history.goBack();
  }
  clickGetVerficationCode () {
    if (this.state.default) {
      this.setState({
          countType: "fl verficaNewBtn",
      });
      const self = this;
      this.tel = setInterval(function(){
        self.setState((prevState) => ({
          co: prevState.co -1
        }));
        if(self.state.co<0){
          clearInterval(self.tel);
          self.setState({
            count:"重新发送验证码",
            co:60,
          });
        } 
        self.setState({
          count:"已发送("+self.state.co+"秒后重发)"
        })
      },1000);
      if(self.state.co == 60){
        HttpP.NN_VerficationCodeP({"mobile":this.state.phoneNumber,"type":2}).then(
          (res) =>{
            if(!res.result){
              alert(res.message);
              if (res.message == "手机号未注册过") {
                clearInterval(self.tel);
                self.setState({
                  count:"发送短信验证码",
                  co:60,
                  countType:"fl verficaNewBtn"
                });
                return;
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
    } else {
      alert("手机号有误!");
    }
  }
  clickNext () {
    const reg = /^[0-9]{6}$/g;
    const self = this;
    if(reg.test(this.state.mobile)){
      this.props.history.push("./changePw?phoneNumber="+this.state.phoneNumber+"&mobile="+this.state.mobile);
      clearInterval(self.tel);
    }else{
      alert("验证码有误有误!");
      return;
    }
  }
  //手机号
  handleChangeTel (event) {
    const reg = /^1[34578]\d{9}$/g;
    if(reg.test(event.target.value)){
      this.setState({
        countType: "fl verficaNewBtnY",
        default:true
      });
    }else{
      this.setState({
        countType: "fl verficaNewBtn",
        default:false
      });
    }
    this.setState({phoneNumber: event.target.value});
  }
  //验证码
  handleChangeCoded (event) {
    this.setState({mobile: event.target.value});
  }
  render() { 
    return (
      <div className="register">
          <div className="regHead"><i onClick = {this.clickBackChange.bind(this)}></i>重置登录密码</div>
          <div className="newPw">
              <div className="clearfix regPhNum">
                <span className="fl difCountry">+86</span>
                <b className="fl difCountryChoice">∨</b>
                <input type="telephone" placeholder="手机号" className="fl telephoneNumber" onChange = {this.handleChangeTel.bind(this)} />
              </div>
              <div className="clearfix">
                  <input type="telephone" placeholder="短信验证码" className="fl verficaNew" onChange = {this.handleChangeCoded.bind(this)} />
                  <p className={this.state.countType} onClick = {this.clickGetVerficationCode.bind(this)}>{this.state.count}</p>
              </div>
          </div>
          <div className="verification">
             <p className="roteContract" onClick = {this.clickNext.bind(this)}>下一步</p> 
          </div>
      </div>
    );
  }
}));
export default withRouter(NewPw);

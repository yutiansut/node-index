// 开户头填写资料
import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';//router
import './plotThird.css';
import HeadTitle from "com/headtitle/headTitle";
import  "mixin/cardBinCheck";
import HttpP from "mixin/httpPub.js";
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
const HeadThird = inject("plotStore")(observer(class HeadThird extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      titleH:"在线开户",
	      titleP:"绑定银行卡",
	      name:"",
	      bankCard:"",
	      bankPh:"",
	      verfiCode:"",
	      idCardType:"",
	      bankCity:"",
	      nameOff:false,
	      bankCardOff:false,
	      bankPhOff:false,
	      verfiCodeOff:false,
	      isAgreeChecket:false,
	      cityOff:false,
	      count:"获取验证码",
	      countType:"fl codeTime1",
	      claNma:"fl checkeboxF",
	    };
	}
	//验证名字
	handleChangeName (event) {
		const regName =  /^[\u4e00-\u9fa5]{2,8}$/;
		if (regName.test(event.target.value)) {
			this.setState({nameOff: true});
		} else {
			this.setState({nameOff: false});
		}
		this.setState({name: event.target.value});
  	}
  	//验证银行卡
  	handleAddBankNum (event) { 
  		this.setState({bankCard: event.target.value});
  		let self = this;
    	window.Bank.getBankBin(event.target.value,function(err,data){
    		if(data){	
    			self.setState({
    				idCardType: data.bankName,
    				bankCardOff:true,
    			});
    		} else {
    			self.setState({
    				bankCardOff:false
    			});
    			// if (event.target.value.length>=15) {
    			// 	alert(err);
    			// }	
    		}
			
		});
  	}
  	//银行卡手机号
  	handleBankPhone (event) {
  		let regPh = /^1[34578]\d{9}$/g;
  		if (regPh.test(event.target.value)) {
  			this.setState({bankPhOff: true});
  		} else {
  			this.setState({bankPhOff: false});
  		}
  		this.setState({bankPh: event.target.value});
  	}
  	//验证码是不六位
  	handleChangeCoded (event) {
  		let regVer = /^\d{6}$/g;
  		if (regVer.test(event.target.value)) {
  			this.setState({verfiCodeOff: true});
  		} else {
  			this.setState({verfiCodeOff: false});
  		}
  		this.setState({verfiCode: event.target.value});
  	}
  	//验证办卡城市
  	handleCity (event) {
  		const regName =  /^[\u4e00-\u9fa5]{2,10}$/;
		if (regName.test(event.target.value)) {
			this.setState({cityOff: true});
		} else {
			this.setState({cityOff: false});
		}
		this.setState({bankCity: event.target.value});
  	}
  	//请求验证码
  	clickGetVerficationCode () {
  		if (this.state.bankPhOff) {
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
		          countType:"fl codeTime1"
		        });
		      } 
		    },1000);
		    if (typeof (this.state.count) != "number") {
		      HttpP.NN_VerficationCodeP({"mobile":this.state.bankPh,"type":1}).then(
		        (res) =>{
		          if(!res.result){
		            alert(res.message);
		            if (res.message == "该手机号已绑定！") {
		              clearInterval(self.tel);
		              self.setState({
		                count:"重新发送",
		                countType:"fl codeTime1"
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
	    } else {
	    	alert("手机号有误！")
	    }
  	}
  	//检验协议是否勾选
  	handleChangeChecket (event) {
    	if(event.target.checked){
	      this.setState({
	        isAgreeChecket: true,
	        claNma:"fl checkeboxF checkedIs"
	      });
	    } else {
	      this.setState({
	        isAgreeChecket:false,
	        claNma:"fl checkeboxF"
	      });
	    }
  	}
  	//点击下一步
  	goonOpenPlot () {
  		if (this.state.nameOff && this.state.bankCardOff && this.state.bankPhOff && this.state.verfiCodeOff && this.state.isAgreeChecket && this.state.cityOff) {
  			let token = localStorage.token;
			let bankUserName = this.state.name;
			let bank = this.state.bankCard;
			let cardType = this.state.idCardType;
			let bankPhone = this.state.bankPh;
			let mobile = this.state.verfiCode;
			let params = {
				"token":token,
				"bankUserName":bankUserName,
				"bank":bank,
				"cardType":cardType,
				"bankPhone":bankPhone,
				"mobile":mobile,
			}
  	// 		HttpP.NN_BandIdP(params).then(
			// 	(res) => {
			// 		if (res.result) {
			// 			alert("已提交，审核中！");
			// 		}
			// 	}
			// ).catch(
			// 	(err) => {
			// 		alert(err);
			// 	}
			// );
  			this.props.history.push("/pages/plot");
  		} else {
  			alert("请仔细核对以上个人信息！");
  		}
  	}
 //  	inputOnFocus () {
    	
	// }
	render() {
		//console.log(window.Bank.getBankBin);
	   return (
	      <div className="plot_first">
	        <HeadTitle  titleH = {this.state.titleH} titleP = {this.state.titleP}/>
	        <div className="bandCard">
	         	<div className = "clearfix putName1">
	         		<span className = "fl name">持卡人:</span>
					<input type="text" value={this.state.name} placeholder="请输入持卡人姓名" className="fl nameInput"  onChange = {this.handleChangeName.bind(this)}/>
	         	</div>
	         	<div className = "clearfix putName1">
	         		<span className = "fl name">卡号:</span>
					<input type="telephone" value={this.state.bankCard} placeholder="请输入卡号" className="fl nameInput" onChange = {this.handleAddBankNum.bind(this)}/>
	         	</div>
 	         	<div className = "clearfix putName1">
 	         		<span className = "fl name">银行卡类型:</span>
 					<input type="text" value={this.state.idCardType} className="fl nameInput" disabled="true"  />
 	         	</div>
 	         	<div className = "clearfix putName1">
	         		<span className = "fl name">办卡城市:</span>
					<input type="telephone" value={this.state.bankCity} placeholder="请输银行办理城市" className="fl nameInput" onChange = {this.handleCity.bind(this)}/>
	         	</div>
 	         	<div className = "clearfix putName1">
	         		<span className = "fl name">手机号:</span>
					<input type="telephone" value={this.state.bankPh} placeholder="请输银行预留手机号" className="fl nameInput" onChange = {this.handleBankPhone.bind(this)}/>
	         	</div>
               	<div className="clearfix">
                    <div className="verfiCodeInput1 clearfix fl">
                        <span className="fl difCountry1">验证码：</span>
                        <input type="telephone" value={this.state.verfiCode} placeholder="请输入验证码" className="fl codeNum1" onChange = {this.handleChangeCoded.bind(this)} />
                    </div>
                    <div className={this.state.countType} onClick = {this.clickGetVerficationCode.bind(this)}>{this.state.count}</div>
              	</div>
              	<div className = "ask">
					<p>绑定银行卡需要短信验证，获取验证码点击“下一步”，即可绑定。</p>
              	</div>
              	<div className="isDisAgree clearfix">
              	  <div className={this.state.claNma}  ref={inpF => this.inpF = inpF}>
              	    <input type="checkbox" className="isdisChecked" onChange = {this.handleChangeChecket.bind(this)} />
              	  </div>
              	  <span className="fl">同意</span>
              	  <b className="fl">《用户协议》</b>
              	</div>
            </div>
	        <div className = "goOnOpenPlotBtn" onClick = {this.goonOpenPlot.bind(this)}>下一步</div>
	      </div>
	   );
	}
}));

export default withRouter(HeadThird);


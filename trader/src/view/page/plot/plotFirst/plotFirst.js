// 开户头填写资料
import React, { Component } from 'react';
import { Link,withRouter,Prompt } from 'react-router-dom';//router
import './plotFirst.css';
import DatePicker from 'react-mobile-datepicker';//日历插件
import HeadTitle from "com/headtitle/headTitle";//公共组件 头部
import pubFn from "mixin/pubFn.js";//公共函数
class HeadFirst extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      titleH:"在线开户",
	      titleP:"填写资料",
	      idCard:"",
	      name:"",
	      idCardDate:"",
	      idCardNum:"",
	      idCardD:"",
	      y:"",
	      m:"",
	      d:"",
	      time: new Date(),
	      isOpen: false,
	    };
	}
	componentDidMount() {
	}
	//点击箭头出日历
  	dateShow () {
	  	this.setState({
	  		isOpen:true
	  	});
  	}
  	//点击取消日历插件消失
	handleCancel () {
		this.setState({ 
	      	isOpen: false
		});
	}
	//点击完成日历插件消失 日期选定在日期框
	handleSelect (time) {
		let sureDate = time;
		let Y=sureDate.getFullYear();
		let M=sureDate.getMonth();
		let D=sureDate.getDay();
		this.setState({ 
			y:Y,
	      	m:pubFn.TDou(M+1),
	      	d:pubFn.TDou(D), 
	      	isOpen: false
		});
	}
	handleChangeName (event) {
    	this.setState({name: event.target.value});
  	}
  	handleChangeId (event) {
  		let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  		this.setState({idCardNum: event.target.value});
  		if (reg.test(event.target.value)) {
  			let yN = event.target.value.slice(6,10);
  			let mN = event.target.value.slice(10,12);
  			let dN = event.target.value.slice(12,14);
  			this.setState({ 
				idCardDate:yN+"/"+(mN)+"/"+(dN),
				idCardD:yN+(mN)+(dN),
			});
  		} else {
  			this.setState({ 
				idCardDate:""
			});
  		}
    	this.setState({idCard: event.target.value});
  	}
	//点击继续开户
	goonOpenPlot () {
		let regName = /^[\u4e00-\u9fa5]{2,8}$/;
		if (this.state.idCardDate!="" && regName.test(this.state.name)) {
			// alert("ok");
			this.props.history.push("./plotSecond?realName="+this.state.name+"&identity="+this.state.idCardNum+"&birthday="+this.state.idCardD+"&validdate="+this.state.y+this.state.m+this.state.d);
		} else {
			alert("输入不符合要求！");
		}

	}
  render() {
    return (
      <div className="plot_first">
         <HeadTitle  titleH = {this.state.titleH} titleP = {this.state.titleP}/>
         <div className="personInfor">
         	<div className = "clearfix putName">
         		<span className = "fl name">姓名:</span>
				<input type="text" value={this.state.name} placeholder="请输入姓名" className="fl nameInput" onChange = {this.handleChangeName.bind(this)}/>
         	</div>
			<div className = "clearfix putName">
         		<span className = "fl name">身份证号:</span>
				<input type="telephone" value={this.state.idCard} placeholder="请输入身份证号" className="fl nameInput" onChange = {this.handleChangeId.bind(this)}/>
         	</div>
         	<div className = "clearfix putName">
         		<span className = "fl name">出身日期:</span>
				<input type="text" value={this.state.idCardDate} className="fl nameInput" disabled="true"  />
         	</div>
         	<div className = "isOkDate">证件有效期</div>
         	<div className = "clearfix putName">
         		<span className = "fl year">{this.state.y}</span>
         		<span className = "fl">年</span>
         		<span className = "fl month">{this.state.m}</span>
         		<span className = "fl">月</span>
         		<span className = "fl day">{this.state.d}</span>
         		<span className = "fl">日</span>
         		<b className = "fl clickSJ" onClick = {this.dateShow.bind(this)}></b>
         	</div>
         	<div className = "goOnOpenPlotBtn" onClick = {this.goonOpenPlot.bind(this)}>继续开户</div>
			<DatePicker  value={this.state.time} isOpen={this.state.isOpen} theme="android-dark" onSelect={this.handleSelect.bind(this)} onCancel={this.handleCancel.bind(this)} />
         </div>
      </div>
    );
  }
}

export default withRouter(HeadFirst);


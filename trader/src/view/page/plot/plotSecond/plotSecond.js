// 开户头填写资料
import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';//router
import './plotSecond.css';
import HeadTitle from "com/headtitle/headTitle";
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
import HttpP from "mixin/httpPub";
import pubFn from "mixin/pubFn.js";//公共函数
const HeadSecond = inject("plotStore")(observer(class HeadSecond extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      titleH:"在线开户",
	      titleP:"上传资料",
	      addPicArr:[{
	      	name:"身份证验证",
	      	clsaaNT:"fl idCardTop",
	      	clsaaNB:"fl idCardBot",
	      },{
	      	name:"合约验证",
	      	clsaaNT:"fl validCardTop",
	      	clsaaNB:"fl validCardBot",
	      },{
	      	name:"银行卡验证",
	      	clsaaNT:"fl bankCard",
	      }],
	      count:0,
	      imageArr:[],//存储上传的照片
	    };
	}
	componentDidMount() {
	}
	getObjectURL(file,obj) {
	    let url = null;
	    let reader = new FileReader();
		reader.readAsDataURL( file );
		reader.onload = function(e){
			url = this.result;
			obj.setAttribute("src",url);
		}
	    return url;
	}
	//上传图片
	filePic (event) {
		let file = event.target.files[0]; //获取图片资源
		this.getObjectURL(file,event.target.previousSibling);
		event.target.previousSibling.style.opacity = "1";
		this.setState((prevCount) =>({
			count: prevCount.count + 1,
		}));
	}
	//点击提交审核
	goonOpenPlot () {
		if (this.state.count >= 5) {
			let token = localStorage.token;
			let realName = pubFn.GetQueryString("realName");
			let identity = pubFn.GetQueryString("identity");
			let birthday = pubFn.GetQueryString("birthday");
			let validdate = pubFn.GetQueryString("validdate");
			const aIn = document.getElementsByTagName("input");
			let formData = new FormData();
			let config = {
		    	headers: {'Content-Type': 'multipart/form-data;charset=UTF-8'}
		   	}
			for (let i=0;i<5;i++){
				formData.append('userImgs',aIn[i].files[0]);
			}
			formData.append('token',token);
			formData.append('realName',realName);
			formData.append('identity',identity);
			formData.append('birthday',birthday);
			formData.append('validdate',validdate);
			// HttpP.NN_PlotActionP(formData,config).then(
			// 	(res) => {
			// 		if (res.result) {
			// 			this.props.history.push("/pages/plot");
			// 		}
			// 	}
			// ).catch(
			// 	(err) => {
			// 		alert(err);
			// 	}
			// );
		} else {
			alert("上传图片个数不对！");
		}
	}
  render() {
    return (
      <div className="plot_first">
         <HeadTitle  titleH = {this.state.titleH} titleP = {this.state.titleP}/>
         <div className="personPic">
	         <ul >
	         	{
	         		this.state.addPicArr.map((name,index) => 
						<li key={index} >
							<p>{name.name}</p>
							<div className = "clearfix">
								<div className = {name.clsaaNT} ><img src="/plot/plot1.png" /><input type="file" name="userImgs" onChange = {this.filePic.bind(this)} multiple accept="image/gif,image/png, image/jpg,image/jpeg" /></div>
								<div className = {name.clsaaNB ? name.clsaaNB : "hide"}><img src="/plot/plot1.png" /><input type="file" name="userImgs" onChange = {this.filePic.bind(this)} multiple accept="image/gif,image/png, image/jpg,image/jpeg" /></div>
							</div>
						</li>
	         		)
	         	}
	         </ul>	
         </div>
         <div className = "goOnOpenPlotBtn" onClick = {this.goonOpenPlot.bind(this)}>提交审核</div>
      </div>
    );
  }
}));

export default withRouter(HeadSecond);


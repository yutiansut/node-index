'use strict'
//合约类型
import {extendObservable,observable, action, computed, useStrict} from 'mobx';// 官网的create_app 不支持es7的@装饰器 用extendObservable代替。
import HttpP from "mixin/httpPub";
const PlotStore = function(){
    extendObservable(this, {//this指的就是 mobox Store
        processNum:observable(0),//开户进度条
        processCount:observable(0),//开户进度条决定颜色
        plotBtnNav:observable("开户交易"),//登录成功后储存数据
        plotType:observable(0),//登录成功后储存数据
        plotAc:action(function(a,b,c,d){//登录储存数据
			this.processNum = a;
			this.processCount = b;
			this.plotBtnNav.set(c);
			this.plotType = d;
        }),
        plotHttpTypeAc:action(function(token){//获取后台数据修改前端开户样式
            HttpP.NN_PlotTypeP({"token":token,}).then(
                  (res) =>{
                    // console.log(res)
                    if(!res.result){
                      alert(res.message);
                      this.plotAc(0,0,"开户交易",0);
                    }else{
                      if (res.resultData.auth == "0") {
                        this.plotAc(0,0,"开户交易",0);
                      } else if (res.resultData.auth == "1") {
                        this.plotAc(3,0,"审核中",1);
                      }else if (res.resultData.auth == "2") {
                        this.plotAc(3,0,"下一步",0);
                      }else if (res.resultData.auth == "3") {
                        this.plotAc(3,1.99,"审核中",1);
                      }else if (res.resultData.auth == "4") {
                        this.plotAc(3,2,"去交易",0);
                      }
                    }
                  }
                ).catch(
                  (err) =>{
                    this.plotAc(0,0,"开户交易",0);
                    alert("请求失败");
                  }
                );
            }),
    })
}
const plotStore = new PlotStore();

export default plotStore;
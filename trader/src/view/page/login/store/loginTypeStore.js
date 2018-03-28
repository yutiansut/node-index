//合约类型
import {extendObservable,observable, action, computed, useStrict} from 'mobx';// 官网的create_app 不支持es7的@装饰器 用extendObservable代替。
const LoginStore = function(){
    extendObservable(this, {//this指的就是 mobox Store
        loginOkObj:observable({}),//登录成功后储存数据
        loginOkAc:action(function(json){//登录储存数据
			this.loginOkObj = json;
        }),
    })
}
const loginStore = new LoginStore();

export default loginStore;
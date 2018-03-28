//合约类型
import {extendObservable,observable, action, computed, useStrict} from 'mobx';// 官网的create_app 不支持es7的@装饰器 用extendObservable代替。
const ContractStore = function(){
    extendObservable(this, {//this指的就是 mobox Store
        contractString:observable("5M0"),//字符串的时候需要获取用get 设置用set
        isClickChange:action(function(str){//默认数据 在action里面变换 可操作或者componentDidMount里面直接操作
			  this.contractString.set(str);
        }),
    })
}
const contractStore = new ContractStore();
export default contractStore;
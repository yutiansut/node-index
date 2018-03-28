//合约类型
import {extendObservable,observable, action, computed, useStrict} from 'mobx';// 官网的create_app 不支持es7的@装饰器 用extendObservable代替。
const ContractDataStore = function(){
    extendObservable(this, {//this指的就是 mobox Store
        contractData:observable([]),//字符串的时候需要获取用get 设置用set
        contractDataMa:observable({}),
        isClickChangeData:action(function(data,data1,data2,data3,data4){//默认数据 在action里面变换 可操作或者componentDidMount里面直接操作
			  this.contractData = data.slice();
              this.contractDataMa = {
                ma5:data1,
                ma10:data2,
                ma20:data3,
                ma30:data4,
            };
        }),
    })
}
const contractDataStore = new ContractDataStore();
export default contractDataStore;
// 总状态管理页面
import contractStore from 'view/page/contractHome/store/contractType.js';
// import chartHcStore from 'view/page/contractHome/store/hcFunction.js';
import contractDataStore from 'view/page/contractHome/store/contractDataStore.js';
import loginStore from 'view/page/login/store/loginTypeStore.js';
import plotStore from 'view/page/plot/store/plotStore.js';

//新数据类型
import liveStore from 'view/page/contractHome/store/lastStore.js';

//交易数据类型
import traderStore from 'view/page/doTrader/store/traderStore.js';
const stores = {contractStore,contractDataStore,loginStore,plotStore,liveStore,traderStore}
export default  stores;

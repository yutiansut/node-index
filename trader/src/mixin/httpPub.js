import axios from 'axios';//ajax 数据交互 开户进程数据
import qs from 'qs';//ajax 数据交互 开户进程数据
import UrlP from "api/api";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 请求拦截器
axios.interceptors.request.use(function(config) {
    return config;
  }, function(error) {
    return Promise.reject(error);
  })
  // 响应拦截器
axios.interceptors.response.use(function(response) {
  return response
}, function(error) {
  return Promise.reject(error)
})
//牛牛
let JsonBird = UrlP.wsapi.pubHttpUrl;
let NN_reg = "/usercenter/sso/registerVali";
let NN_login = "/usercenter/sso/loginVali";
let NN_verficationCode = "/usercenter/mobilecode/execute";
let NN_changePw = "/usercenter/sso/resetPwd";
let NN_klinedata = ":8200/tradermaket/klinedata";//历史k数据
let NN_indicatorsdata = ":8200/tradermaket/indexData";//历史技术指标数据
let NN_fileInfoList = ":8200/tradermaket/file/fileInfoList";//查询
let NN_dlFile = ":8200/tradermaket/file/dlFile";//查询
let NN_plotType = "/usercenter/account/get/account";//查询开户状态
let NN_plotAction = "/usercenter/account/open/account";//开户
let NN_bandId = "/usercenter/account/open/bankinfo";//绑定银行卡
let NN_historyOrder = ":8400/ordermarket/his/orderdata";//订单历史数据
// 封装axios的post请求
export function fetchGet(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url+"?"+params)
      .then(response => {
        console.log(response.data)
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export function fetchPost(url, params,config) {
  return new Promise((resolve, reject) => {
    if (config) {
      axios.post(url, params,config)
      .then(response => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
    } else {
      axios.post(url, qs.stringify(params))
      .then(response => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
    }
    
  })
}
const HttpP = {
  // 注册 get
  NN_RegG(params) {
    let url = JsonBird + NN_reg;
    let par ="";
    for(const param  in  params){
      par = par +param+"="+params[param]+"&";
    }
    return fetchGet(url, par);
  },
  //注册 post
  NN_RegP(params) {
    let url = JsonBird + NN_reg;
    return fetchPost(url, params);
  },
  //登录 post
  NN_LoginP(params) {
    let url = JsonBird + NN_login;
    return fetchPost(url, params);
  },
  //用户获取验证码 post
  NN_VerficationCodeP(params) {
    let url = JsonBird + NN_verficationCode;
    return fetchPost(url, params);
  },
  //修改密码 post
  NN_ChangePwP(params) {
    let url = JsonBird + NN_changePw;
    return fetchPost(url, params);
  },
  //获取k线数据 post
  NN_KlinedataP(params) {
    let url = JsonBird + NN_klinedata;    
    return fetchPost(url, params);
  },
  //获取指标数据 post
  NN_IndicatorsdataP(params) {
    let url = JsonBird + NN_indicatorsdata;  
    return fetchPost(url, params);
  },
  //查询交易所数据 post
  NN_FileInfoListP() {
    let url = JsonBird + NN_fileInfoList;
    return fetchPost(url);
  },
  //下载交易所数据 post
  NN_DlFileP(params) {
    let url = JsonBird + NN_dlFile;
    return fetchPost(url, params);
  },
  //查询开户状态 post
  NN_PlotTypeP(params) {
    let url = JsonBird + NN_plotType;
    return fetchPost(url, params);
  },
  //用户开户 post
  NN_PlotActionP(params,config) {
    let url = JsonBird + NN_plotAction;
    return fetchPost(url, params,config);   NN_bandId
  },
  //绑定银行卡 post
  NN_BandIdP(params) {
    let url = JsonBird + NN_bandId;
    return fetchPost(url, params);   
  },  
  //历史订单
  NN_historyOrderP (params) {
    let url = JsonBird + NN_historyOrder;
    return fetchPost(url, params);   
  },
}
export default HttpP;
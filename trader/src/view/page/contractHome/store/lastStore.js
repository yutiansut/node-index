//实时数据状态管理组件
import { extendObservable, observable, action, computed, useStrict } from 'mobx'; // 官网的create_app 不支持es7的@装饰器 用extendObservable代替。
import UrlP from 'api/api';
import pubFn from "mixin/pubFn.js"; //公共函数
import HttpP from "mixin/httpPub";
import chartHcStore from "./hcFunction.js"; //画图函数
const Store = function() {
  extendObservable(this, { //this指的就是 mobox Store
    category: observable(1), //请求数据类型--什么柜台公司
    indexNum: observable(0), //判断是期货还是股票
    getIdStr: observable("container"),
    getdata5MVoluem: observable([]),
    handicapNavListObj: observable({ //盘口数据
      "amount": "",
      "dateTime": "", //string,日期时间
      "ask": '0.00', //double,卖出价
      "askSize": "", //int, 卖出量
      "bid": '0.00', //double,买入价
      "bidSize": '', //int，买入量
      "highPrice": '', //double,最高价
      "key": {
        "contractKey": "", //string,合约号key
        "exchangeEnum": 2 //int,交易所 枚举值
      },
      "dataType": "TICKDATA", //string,盘口实时数据
      "lastPrice": '', //double,最新价
      "lowPrice": '', //double,最低价
      "openPrice": '', //double,开盘价
      "ud": 0, //double,涨跌
      "udPer": "", //string,涨幅
      "volume": '', //long,成交量
      "closePrice": '', //double,收盘价
      "preClosePrice": '', //double,昨收盘价
      "etfIOPV": '', //double,ETF的基金份额参考净值
    }),
    socketData: action(function(json) { //请求socket 数据模板 因为是对象只看你需要哪个值传递哪个值
      return {
        "startIndex": json.startIndex,
        "clientType": json.clientType,
        "data": [{
          "contractKey": json.contractKey,
          "exchangeEnum": json.exchangeEnum
        }],
        "num": json.num,
        "modle": "MAKETDATA",
        "active": json.active,
        "room": json.room,
        "token": json.token,
        "sort": json.sort,
        "blockID": json.blockID, //int板块类别Id。 0:空值
      }
    }),
    socket: observable( //一些数组储存数据 及一些共用的变量 如socket
      {
        newSocket: null,
        lastJson: [],
        timeDataClosed: [],
        timeDataOpen: [],
        timeDataHigh: [],
        timeDataLow: [],
        timeData5MClosed: [],
        volumDataAll: [],
        timeTimeLine: [],
        datak: [],
        datakS5: [],
        datakS10: [],
        datakS20: [],
        datakS30: [],
        datakS50: [],
        datakV: [],
        contrackArr: [],
        posts: [[{
          name: "美黄金"
        }, {
          name: "美原油"
        }, {
          name: "恒指"
        }], [{
          name: "美原油"
        }], [{
          name: "美黄金"
        }]], //数据接过来没有名字 需要加入对应的名字
      }
    ),
    //上来获取的默认合约列表
    socketOpen: action(function(obj) { //obj看哪个页面刷新在创建新的socket 得到data.connect == "ok" 在获取对应的值  如合约列表如盘口数据
      this.socket.newSocket = new WebSocket(UrlP.wsapi.newUrlBase);
      const category = this.category.get();
      const enterObject = {
        "blockID": 1,
        "modle": "MAKETDATA", //string常量，固定值
        "active": "ENTER", //string操作动作
        "room": 1, //int房间常量，固定值
        "token": localStorage.token, //string用户登陆标示
        "clientType": 0, //int客户端类别，0:H5,1:android,2:ios,3:pc
      };
      this.socket.newSocket.onopen = () => {
        this.socket.newSocket.send(JSON.stringify(this.socketData(enterObject)));
      };
      this.socket.newSocket.onmessage = (evt) => {
        const data = JSON.parse(evt.data);
        let newObj = [];
        // console.log(data);
        if (data.dataType === "ENTER") { //建立连接
          if (data.connect === "ok" && obj) {
            this.socket.newSocket.send(JSON.stringify(this.socketData(obj)));
          }
        } else if (data.dataType === "MARKETSORT") { //合约列表
          // console.log(data.list);
          for (let i = 0; i < data.list.length; i++) {
            let extendObj = pubFn.extend(data.list[i], this.socket.posts[this.indexNum.get()][i]);
            newObj.push(extendObj);
          }
          this.socket.lastJson = data.list;
        } else if (data.dataType === "TICKDATA") { //盘口数据
          if (data) {
            this.handicapNavListObj = data;
          // console.log(data.bidSize + ":" + data.askSize);
          }
        }
      };
    }),
    //点击切换不同类型合约列表数据
    difContractType: action(function(num, ind) {
      if (this.socket.newSocket.readyState === 1) {
        this.indexNum.set(ind);
        const liveListObject = {
          "blockID": num,
          "startIndex": 0,
          "clientType": 0,
          "data": [],
          "num": 50,
          "modle": "MAKETDATA",
          "active": "MARKETSORT",
          "sort": "0",
          "room": 1,
          "token": localStorage.token,
        };
        this.socket.newSocket.send(JSON.stringify(this.socketData(liveListObject)));
      }
    }),
    //历史数据数据
    historyKLineData: action(function(json) {
      //http获取历史数据
      let key = json.key || localStorage.contractKey;
      let exchange = json.exchange || localStorage.exchangeEnum;
      let startIndex = json.startIndex || "0";
      let num = json.num || 300;
      let tp = (json.type === "5M0") ? "1M" : json.type;
      let mk = 55;
      let indexType = json.indexType || "MA";
      HttpP.NN_KlinedataP({
        "contractKey": key,
        "exchange": exchange,
        "kType": tp,
        "startIndex": startIndex,
        "num": num
      }).then(
        (res) => {
          if (!res.result) {
            alert(1)
            alert(res.message)
          } else {
            // console.log(res)
            if (res.result) {
              let reL = res.resultData.kLineDataList.length;
              for (let i = 0; i < reL; i++) {
                this.socket.timeData5MClosed.push(res.resultData.kLineDataList[i].closePrice); //5分钟的分时图收盘价
                this.socket.volumDataAll.push(res.resultData.kLineDataList[i].volume); //成交量
                this.socket.timeTimeLine.push(res.resultData.kLineDataList[i].dateTime); //时间
                this.socket.timeDataOpen.push(res.resultData.kLineDataList[i].openPrice); //开盘价
                this.socket.timeDataClosed.push(res.resultData.kLineDataList[i].closePrice); //收盘价
                this.socket.timeDataHigh.push(res.resultData.kLineDataList[i].highPrice); //最高价
                this.socket.timeDataLow.push(res.resultData.kLineDataList[i].lowPrice); //最低价
              }
              this.dataChange(json.type, 55); //历史数据默认只画K线跟交易量
              this.historyIndicatorsData(json); //k线画完要画默认MA      
            }
          }
        }
      ).catch(
        (err) => {
          // alert("数据异常");
        }
      );
    }),
    //历史技术指标数据
    historyIndicatorsData: action(function(json) {
      let key = json.key || localStorage.contractKey;
      let exchange = json.exchange || localStorage.exchangeEnum;
      let startIndex = json.startIndex || "0";
      let num = json.num || 300;
      let indexType = json.indexType || "MA";
      let tp = (json.type == "5M0") ? "5M" : json.type;
      let mk = 55;
      //获取图表不同区域
      const series0 = chartHcStore.chartsetK.series[0];
      const series1 = chartHcStore.chartsetK.series[1];
      const series2 = chartHcStore.chartsetK.series[2];
      const series3 = chartHcStore.chartsetK.series[3];
      const series4 = chartHcStore.chartsetK.series[4];
      const series5 = chartHcStore.chartsetK.series[5];
      const series6 = chartHcStore.chartsetK.series[6];
      const series7 = chartHcStore.chartsetK.series[7];
      //ma值储存数组
      let dataMa5 = [];
      let dataMa10 = [];
      let dataMa20 = [];
      let dataMa30 = [];
      let dataMa50 = [];
      //MACD值储存数组
      let macd1 = [];
      let macd2 = [];
      let macd3 = [];
      //KDJ值储存数组
      let kdj1 = [];
      let kdj2 = [];
      let kdj3 = [];
      //boll值储存数组
      let up = [];
      let midL = [];
      let down = [];
      if (indexType != "VOLUEM") {
        HttpP.NN_IndicatorsdataP({
          "contractKey": key,
          "exchange": exchange,
          "kType": tp,
          "startIndex": startIndex,
          "indexType": indexType,
          "num": num
        }).then(
          (res) => {
            if (res.result) {
              // console.log(res);
              let sureNum = res.resultData.indexDataList.length; //数据数量个数
              let reL = sureNum < 57 ? 57 : sureNum; //判断够不够一屏幕;
              // let time = +new Date() - parseInt(tp)*reL*60000;     
              if (res.resultData.indexDataList[0].indexType) {
                // let time = pubFn.getTime(res.resultData.indexDataList[0].dateTime);   
                let time = +new Date() - reL * 60000;
                if (res.resultData.indexDataList[0].indexType.split("_")[1] === "MA" && json.type !== "5M0") {
                  for (let i = 0; i < reL; i++) {
                    if (i < sureNum) {
                      dataMa5.push([time + i * 60000, Number(res.resultData.indexDataList[i].data1)]);
                      dataMa10.push([time + i * 60000, Number(res.resultData.indexDataList[i].data2)]);
                      dataMa20.push([time + i * 60000, Number(res.resultData.indexDataList[i].data3)]);
                      dataMa30.push([time + i * 60000, Number(res.resultData.indexDataList[i].data4)]);
                    } else {
                      dataMa5.push([time + i * 60000, null]);
                      dataMa10.push([time + i * 60000, null]);
                      dataMa20.push([time + i * 60000, null]);
                      dataMa30.push([time + i * 60000, null]);
                    }
                  }
                  series1.update({ //图例有效区------也就是数据展示区，数据需要这series这个属性里设置。
                    type: 'spline',
                    color: "#eba313",
                    animation: false,
                    dataGrouping: {
                      enabled: false
                    },
                    data: dataMa5 //数据
                  });
                  series2.update({
                    type: 'spline',
                    color: "#09afec",
                    animation: false,
                    dataGrouping: {
                      enabled: false
                    },
                    data: dataMa10 //数据
                  });
                  series3.update({
                    type: 'spline',
                    color: "#e41285",
                    animation: false,
                    dataGrouping: {
                      enabled: false
                    },
                    data: dataMa20 //数据
                  });
                  series4.update({
                    type: 'spline',
                    color: "green",
                    animation: false,
                    dataGrouping: {
                      enabled: false
                    },
                    data: dataMa30 //数据
                  });
                } else if (res.resultData.indexDataList[0].indexType.indexOf("BOLL") !== -1 && json.type !== "5M0") {
                  for (let i = 0; i < reL; i++) {
                    if (i < sureNum) {
                      up.push([time + i * 60000, Number(res.resultData.indexDataList[i].data1)]);
                      midL.push([time + i * 60000, Number(res.resultData.indexDataList[i].data2)]);
                      down.push([time + i * 60000, Number(res.resultData.indexDataList[i].data3)]);
                    } else {
                      up.push([time + i * 60000, null]);
                      midL.push([time + i * 60000, null]);
                      down.push([time + i * 60000, null]);
                    }

                  }
                  series1.update({ //图例有效区------也就是数据展示区，数据需要这series这个属性里设置。
                    type: 'spline',
                    color: "#eba313",
                    data: up //数据
                  });
                  series2.update({
                    type: 'spline',
                    color: "#09afec",
                    data: midL //数据
                  });
                  series3.update({
                    type: 'spline',
                    color: "#e41285",
                    data: down //数据
                  });
                  series4.update({
                    type: 'spline',
                    color: "",
                    data: [] //数据
                  });
                } else if (res.resultData.indexDataList[0].indexType.split("_")[1] == "MACD" && json.type != "5M0") {
                  for (let i = 0; i < reL; i++) {
                    if (i < sureNum) {
                      macd1.push([time + i * 60000, Number(res.resultData.indexDataList[i].data3)]);
                      macd2.push([time + i * 60000, Number(res.resultData.indexDataList[i].data4)]);
                      macd3.push([time + i * 60000, Number(res.resultData.indexDataList[i].data5)]);
                    } else {
                      macd1.push([time + i * 60000, null]);
                      macd2.push([time + i * 60000, null]);
                      macd3.push([time + i * 60000, null]);
                    }

                  }
                  series5.update({ //图例有效区------也就是数据展示区，数据需要这series这个属性里设置。
                    type: "column",
                    color: "red",
                    zones: [{
                      value: 0,
                      color: '#70edab'
                    }],
                    pointPadding: 0,
                    borderWidth: 0,
                    turboThreshold: 23 * 60,
                    animation: false,
                    dataGrouping: {
                      enabled: false
                    },
                    pointWidth: 1,
                    yAxis: 1,
                    data: macd1 //数据 

                  });
                  series6.update({
                    type: 'spline',
                    yAxis: 1,
                    data: macd2 //数据
                  });
                  series7.update({
                    type: 'spline',
                    yAxis: 1,
                    data: macd3 //数据
                  });
                } else if (res.resultData.indexDataList[0].indexType.indexOf("KDJ") !== -1 && json.type !== "5M0") {
                  for (let i = 0; i < reL; i++) {
                    if (i < sureNum) {
                      kdj1.push([time + i * 60000, Number(res.resultData.indexDataList[i].data1)]);
                      kdj2.push([time + i * 60000, Number(res.resultData.indexDataList[i].data2)]);
                      kdj3.push([time + i * 60000, Number(res.resultData.indexDataList[i].data3)]);
                    } else {
                      kdj1.push([time + i * 60000, null]);
                      kdj2.push([time + i * 60000, null]);
                      kdj3.push([time + i * 60000, null]);
                    }

                  }
                  series5.update({ //图例有效区------也就是数据展示区，数据需要这series这个属性里设置。
                    type: 'spline',
                    yAxis: 1,
                    data: kdj1 //数据

                  });
                  series6.update({
                    type: 'spline',
                    yAxis: 1,
                    data: kdj2 //数据
                  });
                  series7.update({
                    type: 'spline',
                    yAxis: 1,
                    data: kdj3 //数据
                  });
                }
              } else {
                return;
              }
            }
          }
        )
      } else {
        let vol = this.getdata5MVoluem;
        series5.update({ //图例有效区------也就是数据展示区，数据需要这series这个属性里设置。
          type: 'column',
          yAxis: 1,
          pointWidth: 4,
          data: vol //数据

        });
        series6.update({
          type: 'spline',
          yAxis: 1,
          data: [] //数据
        });
        series7.update({
          type: 'spline',
          yAxis: 1,
          data: [] //数据
        });
      }
    }),
    //实时数据
    difContractLastData: action(function(num, ind, key, exchange) {
      if (this.socket.newSocket.readyState == 1) {
        this.indexNum.set(ind);
        const liveListObject = {
          "blockID": num,
          "startIndex": 0,
          "clientType": 0,
          "contractKey": key,
          "exchangeEnum": exchange,
          "num": 3,
          "modle": "MAKETDATA",
          "active": "MARKETSORT",
          "sort": "0",
          "room": 1,
          "token": localStorage.token,
        };
        this.socket.newSocket.send(JSON.stringify(this.socketData(liveListObject)));
      }
    }),
    //清除数组
    dataClear: action(function() {
      this.socket.timeData5MClosed = [];
      this.socket.volumDataAll = [];
      this.socket.timeTimeLine = [];
      this.socket.timeDataOpen = [];
      this.socket.timeDataClosed = [];
      this.socket.timeDataHigh = [];
      this.socket.timeDataLow = [];
      this.socket.datakS5 = [];
      this.socket.datakS10 = [];
      this.socket.datakS20 = [];
      this.socket.datakS30 = [];
    }),
    //画图
    dataChange: action(function(type, mk) {
      let sureNum = this.socket.timeData5MClosed.length; //数据数量个数
      let reL = sureNum < 57 ? 57 : sureNum; //判断够不够一屏幕
      let time = +new Date() - reL * 60000;
      // let time = pubFn.getTime(this.socket.timeTimeLine[0]);
      let data5M = [];
      let data5MVoluem = [];
      let datak = [];
      let self = this;
      for (let i = 0; i < reL; i++) {
        let oo = this.socket.timeDataOpen[i];
        let cc = this.socket.timeDataClosed[i];
        let hh = this.socket.timeDataHigh[i];
        let ll = this.socket.timeDataLow[i];
        let tt = this.socket.timeTimeLine[i];
        if (i < sureNum) {
          data5M.push([time + parseInt(type) * i * 60000, Number(self.socket.timeData5MClosed[i])]);
          data5MVoluem.push({
            x: time + i * 60000,
            y: self.socket.volumDataAll[i],
            color: oo > cc ? "#70edab" : "red",
            trueTime: pubFn.getTime(tt)
          });
          datak.push([
            time + i * 60000,
            oo,
            hh,
            ll,
            cc,
          ]);
        } else {
          data5M.push([time + parseInt(type) * i * 60000, null]);
          data5MVoluem.push({
            x: time + i * 60000,
            y: null,
            color: null,
            trueTime: null
          });
          datak.push([
            time + i * 60000,
            null,
            null,
            null,
            null,
          ]);
        }
      }
      this.getdata5MVoluem = data5MVoluem;
      this.dataClear();
      if (type == "5M0") {
        chartHcStore.isClickHc(this.getIdStr.get(), time, {
          data: data5M,
          data6: [],
          data4: data5MVoluem
        }, "T");
      } else {
        chartHcStore.isClickHc(this.getIdStr.get(), time, {
          data: datak,
          data1: [],
          data2: [],
          data3: [],
          data5: [],
          data4: data5MVoluem
        }, "MK", mk);
      }
    }),
    //横屏与竖屏切换时需要切换元素ID 好让hc画图
    changeId: action(function(str) {
      this.getIdStr.set(str);
    }),
    //盘口数据
    handicapData: action(function(key, exchange) {
      if (this.socket.newSocket.readyState == 1) {
        const hadicapObject = {
          "clientType": 0,
          "contractKey": key,
          "exchangeEnum": exchange,
          "modle": "MAKETDATA",
          "active": "SUBTICK",
          "room": 1,
          "token": localStorage.token,
        };
        this.socket.newSocket.send(JSON.stringify(this.socketData(hadicapObject)));
      }
    }),
    //列表数据
    listData: action(function() {
      if (this.socket.newSocket.readyState == 1) {
        const listObject = {
          "blockID": 1,
          "startIndex": 0,
          "clientType": 0,
          "data": [],
          "num": 3,
          "modle": "MAKETDATA",
          "active": "MARKETSORT",
          "sort": "0",
          "room": 1,
          "token": localStorage.token,
        };
        this.socket.newSocket.send(JSON.stringify(this.socketData(listObject)));
      }
    }),
    unfinishedTodos: computed(function(num) {})
  })
}
const liveStore = new Store();

export default liveStore;
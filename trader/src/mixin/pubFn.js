const pubFn = {
	//补零
	TDou: (n) => {
	    if (n < 10) {
	        return "0" + n;
	    } else {
	        return "" + n;
	    }
	},
	GetQueryString:(name) =>{
	    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    let r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]);
	    return null;
	},
	extend : (target, source) => {
        for (let obj in source) {
            target[obj] = source[obj];
        }
        return target;
  },
  getTime : (str) => {
  	let yN = str.slice(0,4);
		let mN = str.slice(4,6);
		let dN = str.slice(6,8);
		let sN = str.slice(8,10);
		let fN = str.slice(10,12);
		let date = new Date(yN,mN-1,dN,sN,fN,0,0,0);
		return date.getTime();
  },
  //时间字符串转换为时间戳
  getDateTime : (dataTimeTime) => {
    const st = dataTimeTime;
    const aa = st.split(" ");
    const bb = aa[0].split("-");
    const cc = aa[1].split(":");
    return  + new Date(bb[0],bb[1]-1,bb[2],cc[0],cc[1],cc[2]);   
  },
  //MA
  computationdMA : (arr, N) => {
    if (N < arr.length) {
        var zs = new Array(arr.length - N + 1);
        if (arr.length > 0) {
            var d = 0;
            var js = 0;
            while (d < arr.length - 1) {
                if (js == 0) {
                    var he = 0;
                    for (var i = 0; i < N; i++) {
                        if ((i + d) <= arr.length - 1) {
                            he += arr[i + d];
                        }
                    }
                    zs[js] = (he / N);
                } else {
                    zs[js] = arr[d] / N + (zs[js - 1] * (N - 1)) / N;
                }
                ++d;
                js += 1;
            }
        }
        return zs;
    }else{
      var zs = new Array(N);
      for (var i = 0; i < arr.length; i++) {
          zs.push(arr[i]);
      }
      return zs;
    }
  },
  //
  //MACD
  computationdMACD : (SHORT, LONG, M, arr) => {
      var arrMacd = [{}];
      arrMacd[0].Ema12Value = arr[0];
      arrMacd[0].Ema26Value = arr[0];
      arrMacd[0].DifValue = arrMacd[0].Ema12Value - arrMacd[0].Ema26Value;
      arrMacd[0].DeaValue = arrMacd[0].DifValue;
      arrMacd[0].MacdValue = 2.0 * (arrMacd[0].DifValue - arrMacd[0].DeaValue);
      for (var i = 1; i < arr.length; i++) {
          arrMacd.push({});
          arrMacd[i].Ema12Value = (2 * arr[i] + (SHORT - 1) * arrMacd[i - 1].Ema12Value) / (SHORT + 1);
          arrMacd[i].Ema26Value = (2 * arr[i] + (LONG - 1) * arrMacd[i - 1].Ema26Value) / (LONG + 1);
          arrMacd[i].DifValue = arrMacd[i].Ema12Value - arrMacd[i].Ema26Value;
          arrMacd[i].DeaValue = (2 * arrMacd[i].DifValue + (M - 1) * arrMacd[i - 1].DeaValue) / (M + 1);
          arrMacd[i].MacdValue = 2.0 * (arrMacd[i].DifValue - arrMacd[i].DeaValue);
      }
      return arrMacd;
  },
  //kdj
  ComputationKJD : (N, M1, M2, KLStocklist) => {
      var lastArr = [];
      for (var i = 0; i < KLStocklist.length; i++) {
          lastArr.push({});
          var RSV = 0;
          var a = 0;
          var b = 0;
          var e = 0;
          var mmm = this.GetMinMaxPirce(KLStocklist, 9);
          if (i == 0) {
              RSV = (KLStocklist[i][3] - mmm[i].MinPrice) / (mmm[i].MaxPrice - mmm[i].MinPrice) * 100;
              a = (1 * RSV + (M1 - 1) * 0) / 1;
              b = (1 * a + (M2 - 1) * 0) / 1;
              e = 3 * a - 2 * b;

          } else {
              if(mmm[i].MaxPrice == mmm[i].MinPrice){//最大值相等的时候赋值为0.000001
                  RSV = (KLStocklist[i][3] - mmm[i].MinPrice) / (0.000001) * 100;
              }else{
                  RSV = (KLStocklist[i][3] - mmm[i].MinPrice) / (mmm[i].MaxPrice - mmm[i].MinPrice) * 100;
              }
              a = (1 * RSV + (M1 - 1) * lastArr[i - 1].Kvalue) / M1;
              b = (1 * a + (M2 - 1) * lastArr[i - 1].Dvalue) / M2;
              e = 3 * a - 2 * b;
          }
          lastArr[i].RSV = RSV;
          lastArr[i].Kvalue = a;
          lastArr[i].Dvalue = b;
          lastArr[i].Jvalue = e;

          if (a < 0) lastArr[i].Kvalue = 0;
          if (a > 100) lastArr[i].Kvalue = 100;
          if (b < 0) lastArr[i].Dvalue = 0;
          if (b > 100) lastArr[i].Dvalue = 100;
          if (e < 0) lastArr[i].Jvalue = 0;
          if (e > 100) lastArr[i].Jvalue = 100;
      }
      return lastArr;
  },
  //找最大最小值。
  GetMinMaxPirce : (KLStocklist, N) => {
      var minArr = [];
      var maxArr = [];
      var mmm = [];
      var MAX = [];
      var MIN = [];
      for (var i = 0; i < KLStocklist.length; i++) {
          
          minArr.push(Array.min(KLStocklist[i]));
          maxArr.push(Array.max(KLStocklist[i]));

      }
      for (var i = 0; i < KLStocklist.length; i++) {
          mmm.push({});
          if (i < N) {
              MIN.push(minArr[i]);
              MAX.push(maxArr[i]);
              // MIN.sort();
              // MAX.sort();
              mmm[i].MinPrice = MIN[i];
              mmm[i].MaxPrice = MAX[i];
          } else {
              mmm[i].MinPrice = mmm[i - 1].MinPrice < minArr[i] ? mmm[i - 1].MinPrice : minArr[i];
              mmm[i].MaxPrice = mmm[i - 1].MaxPrice > maxArr[i] ? mmm[i - 1].MaxPrice : maxArr[i];
          }
      }
      return mmm;
  },
  // boll线1
  // 平均值 ----中轨线
  calAverage : (arr, n, w) => {
      var Average = 0;
      if (n < w) {
          for (var p = 0; p < n; p++) {
              Average += Number(arr[p]);
          }
          return Average / n;
      } else {
          for (var p = n - w; p < n; p++) {
              Average += Number(arr[p]);
          }
          return Average / w;
      }
      
  },
  //平方差
  calSdeviation : (average, arr, n, w) => {
      var arr_error = 0;
      if (n < w) {
          for (var i = 0; i < n; i++) {
              arr_error += (arr[i] - average) * (arr[i] - average);
          }
          // arr_error /=n;
          return Math.sqrt(arr_error / n);
      } else {
          for (var i = n - w; i < n; i++) {
              arr_error += (arr[i] - average) * (arr[i] - average);
          }
          // arr_error /=n;
          return Math.sqrt(arr_error / w);
      }

  },

  //boll上轨线
  calBollUp : (average, arr_error) => {
      return average + 2 * arr_error;
  },

  //boll下轨线
  calBollDown : (average, arr_error) => {
      return average - 2 * arr_error;
  },
  //数组的处理
  newArr : (arr1) => {
      var arr = [];
      for (var j = 0; j < arr1.length; j++) {
          arr.push(arr1.slice(0, j + 1));
      }
      return arr;
  },
  //组合上述函数求boll
  arr_errorAll : (arr) => {
      var json = {};
      var arr_errorAllArr = [];
      var bollUpAllArr = [];
      var bollDownAllArr = [];
      var self = this;
      for (var o = 0; o < arr.length; o++) {
          var average = self.calAverage(arr[o], arr[o].length, 26);
          var arr_error = self.calSdeviation(average, arr[o], arr[o].length, 26);
          var bollUp = self.calBollUp(average, arr_error);
          var bollDown = self.calBollDown(average, arr_error);
          // console.log(average);
          arr_errorAllArr.push(average);
          bollUpAllArr.push(bollUp);
          bollDownAllArr.push(bollDown);
      }
      json = {
          arr_errorJson: arr_errorAllArr,
          bollUpAllJson: bollUpAllArr,
          bollDownJson: bollDownAllArr
      }
      return json;
  },
  //正则判断是哪个技术指标
  regTypeIndicators : (str,name) => {
      let reg = new RegExp("(^|_)" + name);
      let r =str.substr(2).match(reg);
      if (r != null) return name;
      return null;
  },
  //内容多省略号...代替
  replaceStr : (str,count) => {
    if (str.length>=count) {
      return str.substring(0,count+1) + "...";
    } else {
      return str;
    }
  },
}

export default pubFn;
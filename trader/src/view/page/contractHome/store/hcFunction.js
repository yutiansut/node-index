//第三方画图插件  highstock
import Highcharts from 'highcharts/highstock';
import {extendObservable,observable, action, computed, useStrict} from 'mobx';// 官网的create_app 不支持es7的@装饰器 用extendObservable代替。
var linecolor = "#000"; //x y轴线或刻度线的颜色值
var linecolor1 = "#2f84cc"; //k线图的颜色
var bgcolor = "#20212a"; //表格背景的颜色
Highcharts.setOptions({
    global: { //设置为中国时间
        useUTC: false
    },
    lang:{
        rangeSelectorZoom:""
    }
});
const ChartHcStore = function(){
    extendObservable(this, {//this指的就是 mobox Store
        chartsetK:observable({}),
        isClickHc:action(function(id,time,data,weekflg,mk){
            this.chartsetK = new Highcharts.StockChart(id, {
                chart: {
                    events: { //里面可以加一些事件，比如load  click等
                        load: function() {
                            // this.tooltip.show();  
                        }
                    },
                    backgroundColor: bgcolor, //背景色表格
                    zoomType: "x",
                    panning: false,
                    pinchType: "x"

                },
                tooltip:weekflg == 'MK' ? {
                    positioner: function () {
                        return { x: 0, y: 20};
                    },
                    dateTimeLabelFormats:{
                        millisecond:"%A, %b %e, %H:%M:%S.%L",
                        second:"%A, %b %e, %H:%M:%S",
                        minute:"%A, %b %e, %H:%M",
                        hour:"%A, %b %e, %H:%M",
                        day:"%A, %b %e, %Y",
                        week:"Week from %A, %b %e, %Y",
                        month:"%B %Y",
                        year:"%Y"
                    },
                    style:{
                        zIndex:10,
                    },
                    shadow: true,
                    shared: true,
                    borderWidth: 0,
                    useHTML: true,
                    shape: 'square',
                    borderColor: '#006cee',
                    borderWidth: 0.6,
                    stickyTracking: true,
                    valueDecimals: 2,
                    backgroundColor: 'rgba(0, 0, 77, 1)',
                    followTouchMove: true,
                    enabled: true,
                    followPointer: true,
                    formatter: function() { //回调函数将格式化提示框中的文本。
                        var points = this.points;
                        // console.log(points)
                        if (points.length>=2) {
                            var t = new Date(points[1].point.options.trueTime);
                            var m = t.getMonth();  // 获取月份(0-11,0代表1月,用的时候记得加上1)
                            var d = t.getDate();  // 获取日(1-31)
                            var h = t.getHours();  // 获取小时数(0-23)
                            var mi = t.getMinutes();  // 获取分钟数(0-59)
                            var tStr = m+"/"+d+" "+h+":"+mi;
                        }
                        if (points[0].point.open != undefined) {
                            var s = '<div style=""><b style="color:#ccc">T:</b><span style="color:green;">'+tStr+'<span></div>'+
                                '<div style=""><b style="color:#ccc">最高：</b><span style="color:green;">'+points[0].point.high+'<span></div>'+
                                '<div style=""><b style="color:#ccc">最低：</b><span style="color:green;">'+points[0].point.low+'<span></div>'+
                                '<div style=""><b style="color:#ccc">开盘：</b><span style="color:green;">'+points[0].point.open+'<span></div>'+
                                '<div style=""><b style="color:#ccc">收盘：</b><span style="color:green;">'+points[0].point.close+'<span></div>';
                        }
                        return s;
                    }
                } : {
                    enabled: false,
                    followTouchMove: false
                }, //数据提示框。
                credits: { // 网站标识
                    enabled: false //去版权
                },
                navigator: { // 底部导航内容
                    enabled: false
                },
                scrollbar: {
                    enabled: false
                },
                rangeSelector: weekflg == 'MK' ? { //缩放
                    selected: 0,
                    inputDateFormat: "%Y-%m-%d %H:%M",
                    buttons: [{
                        type: 'minute',
                        count: mk,
                        text: '1分'
                    }, {
                        type: 'minute',
                        count: 280,
                        text: '3分'
                    }, {
                        type: 'minute',
                        count: 320,
                        text: '5分'
                    }, {
                        type: 'all',
                        text: '所有'
                    }],
                    buttonTheme: {
                        display: 'none' // 不显示按钮
                    },
                    inputEnabled: false // 不显示日期输入框
                } : {
                    enabled: false
                },
                xAxis: weekflg == 'MK' ? {
                    // type: 'logarithmic',
                    tickAmount: 0,
                    plotBorderColor: "red", //图表的边框颜色
                    plotBorderWidth: 1, //图表的边框大小
                    gridLineColor: '#197F07',
                    gridLineWidth: 0.5,
                    gridLineDashStyle: "LongDashDotDot",
                    lineColor: 'yellow', //线颜色
                    lineWidth: 0.5, //线的宽度
                    tickWidth: 0, //线上刻度线宽度
                    tickColor: "green", //线上刻度线颜色
                    top: 100,
                    crosshair: {
                        snap: true,
                        width: 1,
                        color: '#fff',
                        dashStyle: 'shortdot'
                    },
                    labels: {
                        enabled: false
                    },
                    // min:time,//最小值
                    // max:time+1*36e5,//最大值，最小最大值都是字符串
                    enabled: false
                }:{ //x轴设置
                    dateTimeLabelFormats: { //格式化时间轴显示样式
                        second: '%H:%M:%S',
                        minute: '%H:%M',
                        hour: '%H:%M',
                        day:  '%H:%M',
                        week: '%H:%M',
                        month: '%H:%M'
                    },
                    startOnTick: true, //开始的数据值显示
                    endOnTick: true, //结束的数据值显示
                    showLastLabel: true,
                    // max: time + 82800000, //最大值，最小最大值都是字符串
                    // min: time, //最小值 
                    left: 1.5,
                    type: 'datetime', //时间轴类型
                    lineColor: '#20212a', //线颜色
                    lineDashStyle: "LongDashDotDot",
                    lineWidth: 0, //线的宽度
                    tickWidth: 0, //线上刻度线宽度
                    tickColor: "green", //线上刻度线颜色
                    tickInterval: 21600000, //每两个值之间的差值。是时间戳
                    tickLength: 5, //线上刻度线长度
                    offset:20,
                    // tickAmount: 5,
                    minTickInterval: 21600000,
                    gridLineColor: '#2e2e30',
                    gridLineWidth: 0.6,
                    // labels: {
                    //     x: 9,
                    //     style: { //刻度文本修饰  颜色和字体大小
                    //         tickWidth: 0,
                    //         color: '#fff',
                    //         fontSize: '12px'
                    //     },
                    //     autoRotation: false,
                    //     autoRotationLimit: 0,
                    //     formatter: function() { //把时间戳转化为字符串

                    //         return Highcharts.dateFormat('%H:%M', this.value);
                    //     },
                    //     step: null //x轴显示额步伐是多长，可以设置自己想要的时间间隔
                    // },
                    // tickPositioner: function() {
                    //     var min =  time; //最小值,
                    //     var max = (time + 82800000);//最大值，最小最大值都是字符串
                    //     if(weekflg != 'MK'){
                    //         var timeA = [time, time + 21600000, time + 43200000, time + 64800000, time + 82800000];
                    //         return timeA;
                    //     }
                        
                    // },
                    plotLines: [{ //指示线 可设置value 标示不同的指示线。
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                yAxis:[{
                    top: 0,
                    opposite: true,
                    //tickInterval:0.10,
                    lineColor: linecolor,
                    gridLineColor: '#2e2e30',
                    gridLineWidth: 0.6,
                    lineWidth: 0,
                    crosshair: true,
                    tickWidth: 10,
                    offset: -30,
                    tickLength: 0,
                    title: {
                        text: '',
                        style: {
                            color: 'red',
                            fontSize: '12px'
                        }
                    },
                    labels: { //内容样式设置
                        align: 'right',
                        x: 21,
                        style: {
                            color: '#a3a2a1',
                            fontSize: '12px'
                        }
                    },
                    plotLines: [{
                        color: '#a3a2a1', //线的颜色，定义为红色
                        dashStyle: 'solid', //默认值，这里定义为实线
                        label: {
                            text: '0% ', //标签的内容
                            align: 'left', //标签的水平位置，水平居左,默认是水平居中center
                            x: 25 //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左25px
                        },
                        value: "delP", //定义在那个值上显示标示线
                        style: {
                            color: '#a3a2a1',
                            fontSize: '12px'
                        },
                        zIndex: 100,
                        width: 1 //标示线的宽度，2px
                    }],
                    top: '-10%',
                    height: '80%'
                }, {
                    labels: {
                        enabled: false
                            // align: 'right',
                            // x: -3
                    },
                    gridLineColor:"#a3a2a1",
                    gridLineWidth:0.05,
                    top: '70%',
                    height: '30%',
                    offset: 0,
                    plotBorderWidth: 0
                }],
                plotOptions: { //调试不同图例样式。这里可以根据不同的数据调试不同的图，现在只是分时图，以后有蜡烛图也会在这里相应的设置
                    candlestick: {
                        states: { //去掉鼠标悬浮的选中样式
                            hover: {
                                enabled: false
                            }
                        },
                        pointWidth: 4,
                        pointPadding: 0,
                        lineColor: "#47ee9d",
                        upLineColor: '#f20642',
                        color: 'rgba(71,238,157,0)',
                        upColor: "#f20642",
                        //页面指示最大最小值
                        // dataLabels: {
                        //     enabled: true,
                        //     useHTML:true,
                        //     verticalAlign:"bottom",
                        //     formatter: function() {
                        //         var  maxPoint = this.point.series.dataMax;
                        //         var minPoint = this.point.series.dataMin;
                        //         if (this.point.high === this.point.series.dataMax) {
                        //             return '<span style="color: #f20642;">' + this.point.high + '</span>';
                        //         } else if (this.point.low === this.point.series.dataMin) {
                        //             return '<span style="color: green;">' + this.point.low + '</span>';
                        //         }
                        //     }
                        // }
                    },
                    column: {
                        color: "red",
                        zones: [{
                            value: 0,
                            color: '#70edab'
                        }],
                        pointPadding: 0,
                        borderWidth: 0
                    },
                    spline: {
                        lineWidth: 0.66
                    },
                    turboThreshold: 30000
                },
                series:weekflg == 'MK' ?[
                    {
                        type: 'candlestick',
                        name: 'AAPL',
                        data: data.data,
                        dataGrouping: {
                            enabled: false
                        }
                    }, {
                        type: "spline",
                        color: "#eba313",
                        name: "name",
                        animation: false,
                        dataGrouping: {
                            enabled: false
                        },
                        data: data.data1 //数据 
                    }, {
                        type: "spline",
                        color: "#09afec",
                        name: "name",
                        animation: false,
                        dataGrouping: {
                            enabled: false
                        },
                        data: data.data2 //数据 
                    }, {
                        type: "spline",
                        color: "#e41285",
                        name: "name",
                        animation: false,
                        dataGrouping: {
                            enabled: false
                        },
                        data: data.data3 //数据 
                    },{
                        type: "spline",
                        color: "green",
                        name: "name",
                        animation: false,
                        dataGrouping: {
                            enabled: false
                        },
                        data: data.data5 //数据 
                    },{
                        type: 'column',
                        name: "name1",
                        turboThreshold: 23 * 60,
                        data: data.data4,
                        pointWidth: 4,
                        yAxis: 1,
                        dataGrouping: {
                            enabled: false
                        }
                    },{
                        type: 'spline',
                        name: "name1",
                        color: "yellow",
                        turboThreshold: 23 * 60,
                        data: data.data7,
                        pointWidth: 4,
                        yAxis: 1,
                        dataGrouping: {
                            enabled: false
                        }
                    },{
                        type: 'spline',
                        name: "name1",
                        turboThreshold: 23 * 60,
                        data: data.data8,
                        color: "#fff",
                        pointWidth: 4,
                        yAxis: 1,
                        dataGrouping: {
                            enabled: false
                        }
                    }] :[{
                        type: "spline",
                        name: "name",
                        animation: false,
                        color:"#f7f7f6",
                        dataGrouping: {
                            enabled: false
                        },
                        data: data.data //数据
                    },
                     {
                        type: "spline",
                        color: "yellow",
                        name: "name",
                        animation: false,
                        dataGrouping: {
                            enabled: false
                        },
                        data: data.data6 //数据 
                    },
                    {
                        type: 'column',
                        name: "name1",
                        turboThreshold: 23 * 60,
                        data: data.data4,
                        pointWidth: 0,
                        yAxis: 1,
                        dataGrouping: {
                            enabled: false
                        }
                    }
                ]
            }); 
            // //拖拽图表及tooltip
            (function(H) { 
                // 'use strict';
                var addEvent = H.addEvent,
                    doc = document,
                    body = doc.body;
                var timeout = null,
                    state;
                H.wrap(H.Chart.prototype, 'init', function(proceed) {
                    // Run the original proceed method
                    proceed.apply(this, Array.prototype.slice.call(arguments, 1));
                    var chart = this,
                        options = chart.options,
                        tooltip = chart.options.tooltip || null,
                        candlestick = chart.options.plotOptions.candlestick || null,
                        panning = options.chart.panning || null,
                        followTouchMove = tooltip.followTouchMove || null,
                        zoomType = options.chart.zoomType || '',
                        container = chart.container,
                        yAxis = chart.yAxis[0],
                        xAxis = chart.xAxis[0],
                        downYPixels,
                        downXPixels,
                        downYValue,
                        downXValue,
                        isDragging = false,
                        hasDragged = 0,                            
                        hasDraggedX = 0,
                        hashasDraggedXtype=0,//判断拖拽的方向
                        graph = chart.graph,
                        stateOptions = options.states;
                    // if (panning) {
                        addEvent(container, 'touchstart', function(e) {
                            // $("#dataAna").css("display","none");
                            e.preventDefault();
                            clearTimeout(timeout);
                            state = 0;
                            timeout = setTimeout(function() {
                                state = 1;
                            }, 1000);
                            candlestick.dataLabels.enabled = false;
                            body.style.cursor = 'pointer';
                            downYPixels = chart.pointer.normalize(e).chartY;
                            downXPixels = chart.pointer.normalize(e).chartX;
                            downYValue = yAxis.toValue(downYPixels);
                            downXValue = xAxis.toValue(downXPixels);
                            isDragging = true;
                            
                        });
                        addEvent(container, 'touchmove', function(e) {
                            e.preventDefault();
                            if (state != 1) { //滑动图标  tooltip消失
                                if (isDragging && !H.Pointer.prototype.inClass(e.target, 'highcharts-scrollbar')) {
                                    body.style.cursor = 'pointer';
                                    panning = true;
                                    tooltip.enabled = false;
                                    var dragXPixels = chart.pointer.normalize(e).chartX,
                                        dragXValue = xAxis.toValue(dragXPixels),
                                        xExtremes = xAxis.getExtremes(),
                                        xUserMin = xExtremes.userMin,
                                        xUserMax = xExtremes.userMax,
                                        xDataMin = xExtremes.dataMin,
                                        xDataMax = xExtremes.dataMax,
                                        xMin = xUserMin !== undefined ? xUserMin : xDataMin,
                                        xMax = xUserMax !== undefined ? xUserMax : xDataMax,
                                        newMinX,
                                        newMaxX;
                                    hasDraggedX = Math.abs(downXPixels - dragXPixels);
                                    hashasDraggedXtype=(downXPixels - dragXPixels);
                                    if (hasDraggedX > 5) {
                                        newMinX = xMin - (dragXValue - downXValue);
                                        newMaxX = xMax - (dragXValue - downXValue);
                                        if (newMinX > xDataMin && newMaxX < xDataMax){
                                            xAxis.setExtremes(newMinX < xDataMin ? xDataMin : newMinX, newMaxX > xDataMax ? xDataMax : newMaxX, true, false);
                                        }
                                    }
                                }
                            } else { //滑动tooltip 图标不滑动
                                // alert(1)
                                var aHalo = document.getElementsByClassName("highcharts-halo");
                                for(var i=0;i<aHalo.length;i++){
                                    aHalo[i].style.display = "block";
                                }
                                var aMark = document.getElementsByClassName("highcharts-markers highcharts-tracker");
                                for(var i=0;i<aMark.length;i++){
                                    aMark[i].style.display = "block";
                                }
                                var aHair = document.getElementsByClassName("highcharts-crosshair");
                                for(var i=0;i<aHair.length;i++){
                                    aHair[i].style.visibility = "visible";
                                }
                                if (isDragging) {
                                    body.style.cursor = 'default';
                                    isDragging = false;
                                } 
                                options.chart.panning = false;  
                                tooltip.enabled = true;          
                            }

                        });
                        addEvent(container, 'touchend', function(e) {
                            var aHalo = document.getElementsByClassName("highcharts-halo");
                            for(var i=0;i<aHalo.length;i++){
                                aHalo[i].style.display = "none";
                            }
                            var aMark = document.getElementsByClassName("highcharts-markers highcharts-tracker");
                            for(var i=0;i<aMark.length;i++){
                                aMark[i].style.display = "none";
                            }
                            var aHair = document.getElementsByClassName("highcharts-crosshair");
                            for(var i=0;i<aHair.length;i++){
                                aHair[i].style.visibility = "hidden";
                            }
                            clearTimeout(timeout); //
                            candlestick.dataLabels.enabled = true;
                            panning = false; 
                            tooltip.enabled = false; 
                            state = 0;
                            if (isDragging) {
                                body.style.cursor = 'default';
                                isDragging = false;
                            }

                        });
                    // }
                });
            }(Highcharts));    
        }),
    })
}
const chartHcStore = new ChartHcStore();
export default chartHcStore;
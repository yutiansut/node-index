const oBtn = document.getElementById("btn");
//移动画布函数
var off = false;
var str = "null";
var str1 = "null";
var timer = null;
var n = 800;
//获取cacheCanvas对象(画布)
var canvas1 = document.getElementById("canvas1");
//获取对应的canvasRenderingContext2D对象(画笔)
var ctx1 = canvas1.getContext("2d");
//统计字符长度
var lenReg = function(str) {
    return str.replace(/[^\x00-\xFF]/g, '**').length;
};
function loop(obj, timer, x, y, str, lenStr) {
    if (off) {
        return;
    }
    off = true;
    clearInterval(timer); //定时器先关后开
    //定时器开始移动画笔位置
    timer = setInterval(function() {
        n -= 4.6; //单位针
        //先清除画布
        obj.clearRect(0, 0, x, y);
        obj.font = "bold 30px Microsoft Yahei";
        //设置字体填充颜色
        obj.fillStyle = "green";
        //画布上画文字
        obj.fillText(str, n, 30);
        //根据字符及时间来递归
        if (n <= -lenStr * 27) {
            //递归前清除上一次定时器
            clearInterval(timer);
            off = false;

            //回到初始位置
            n = 800;
            //递归
            // fn&&fn();
            if (str == str1 && str != "null") {
                str = "　　　　　　　　　　　　　　"; 
                loop(obj, timer, x, y, str, lenStr);
                str1 = "　　　　　　　　　　　　　　";
            } else if (str != str1 && str != "null" && str1 != "null") {
                str == str1;
                loop(obj, timer, x, y, str1, lenStr);
            }
        }
    }, 1000 / 42); //定时器时间

}
//字幕
var subtitle = function(str, str1) {
    //字符串字符长度
    var lenStr = lenReg(str);
    //简单地检测当前浏览器是否支持cacheCanvas对象，以免在一些不支持html5的浏览器中提示语法错误
    if (canvas1.getContext) { 
        ctx1.save();
        var n = 800; //初始开始位置
        clearInterval(timer); //定时器先关后开
        loop(ctx1, timer, canvas1.width, canvas1.height, str, lenStr, str1); //函数调用画字幕
        ctx1.restore();
    }
}
oBtn.onclick = function () {
  var name = $(".name").val(); 
  var password = $(".password").val();
  if (name && password) {
    $.ajax({
        url:"/bb",
        type:"get",
        "data":{
          name:name,
          password:password
        },
        success:function (data) {
            var arr = JSON.parse(data);
            var infoMessage = arr.resultList[arr.resultList.length-1].name + ":" + arr.resultList[arr.resultList.length-1].password;
             if (str == str1 && str == "null") {
                  str = infoMessage;
                  str1 = infoMessage;
                  subtitle(str, str1);
              } else {
                  str1 = infoMessage;
              }
            $(".login").hide();
        },
        error:function () {
          $(".login").show();
            console.log("你在给我开玩笑吗");
        }
    })
  } else {
    $(".login").show();
    alert("请输入祝福语！！！");
  }
	
};
1,react里roter Link 只是a标签的变种写法 所以具有a标签的一切属性 点击事件加元素身上不好使 想变块儿需要display 或者定位 或者浮动。

2，官网的react-app脚手架 不支持ES7@装饰器 需要用extendObservable 封装，inject 需要 
	..inject("loginStore"--需要用到的mobx的状态或数据)(observer(react创建组件 )

3，export default 和 export 区别：
	...export与export default均可用于导出常量、函数、文件、模块等。
	...你可以在其它文件或模块中通过import+(常量 | 函数 | 文件 | 模块)名的方式，将其导入，以便能够对其进行使用。
	...在一个文件或模块中，export、import可以有多个，export default仅有一个。
	...通过export方式导出，在导入时要加{ }，export default则不需要。

4，http接口 现在用的是axios 需要后台在过滤器地方设置返回头，去掉跨域限制 后台设置跨域问题配置
	// 设置头部信息防止跨域问题
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
5，	http接口 现在用的是axios，需要自己再封装一下get post 目的；
	..可以在以后的一些需求行有操作的空间，比如说以后要求在没个请求中都添加一个date的属性，那么，加到公用函数上面，所有的请求就都有了
	..提高扩展性
	..封装起来的话可以打印公共的错误信息，添加loding.

6，	http接口 现在用的是axios，get封装需要url的字符串拼接 post需要用qs库把json转为字符串传后台或者 如下这么玩儿
	const params = new URLSearchParams();
    params.append('phoneNumber', '13633203563');
    params.append('userPassword', '123456');
    params.append('mobile', '123456');
    axios.post((UrlP.wsapi.pubHttpUrl+'/usercenter/sso/registerVali'),params).then(res => {
     console.log(res.data)
    });

7,promise 学习

8,在webpack 里配置文件里 config  这样在写代码引用的时候 就不用引太多"../../../"(console.log(__dirname) ==""),resolve 就是字符串的一层层拼接)
  resolve-->alias:{
      '@': path.resolve(__dirname, '../src/images'),//配置css background:url 里面的 ~@ 
      'src': path.resolve(__dirname, '../src'),//配置src文件 src 
      'api': path.resolve(__dirname, '../src/api'),//配置api文件 api 
      'com': path.resolve(__dirname, '../src/component'),//配置component文件 com 
      'redux': path.resolve(__dirname, '../src/redux'),//配置redux文件 redux 
      'router': path.resolve(__dirname, '../src/store'),//配置redux文件 router 
      'style': path.resolve(__dirname, '../src/style'),//配置style文件 style 
      'mixin': path.resolve(__dirname, '../src/mixin'),//配置mixin文件 mixin 
      'view': path.resolve(__dirname, '../src/mainPort'),//配置mainPort文件 view
    }

9,  component意思是组件的意思，所以这里放有js css 的一个模块组件而不是放公共函数。
  pub/mixin可以放公共函数。
  api放ajax函数。
  templete放模块。

10，模块与组件的区别
  模块化中的模块一般指的是 Javascript 模块，比如一个用来格式化时间的模块。
  组件则包含了 template、style 和 script，而它的 Script 可以由各种模块组成。比如一个显示时间的组件会调用上面的那个格式化时间的模块。
  

11,在webpack 里配置文件里 config  这样在写代码引用的时候 就不用引太多"../../../"(console.log(__dirname) ==""),resolve 就是字符串的一层层拼接)
	resolve-->alias:{
      '@': path.resolve(__dirname, '../src/images'),//配置css background:url 里面的 ~@ 
      'src': path.resolve(__dirname, '../src'),//配置src文件 src 
      'api': path.resolve(__dirname, '../src/api'),//配置api文件 api 
      'com': path.resolve(__dirname, '../src/component'),//配置component文件 com 
      'redux': path.resolve(__dirname, '../src/redux'),//配置redux文件 redux 
      'router': path.resolve(__dirname, '../src/store'),//配置redux文件 router 
      'style': path.resolve(__dirname, '../src/style'),//配置style文件 style 
      'mixin': path.resolve(__dirname, '../src/mixin'),//配置mixin文件 mixin 
      'view': path.resolve(__dirname, '../src/mainPort'),//配置mainPort文件 view
    }

12，router 新版本的 v4 react-router-dom  子路由需要用 switch 或者js配置自路由。
    如果想异步操作需要把router  暴露在当前的页面 再用其方法---withRouter(HeadTitle) 在页面用witchRouter 可以做到。
    有witchRouter就可以用router里的一些方法，具体看API。history location match。 

13，user-select:none; 作用是禁止用户选择页面内容，但是它影响了苹果手机输入框输入内容，所以这个属性不能加载样式里面，如果想控制，需要js逻辑处理。

14,js实现点击链接下载文件---Blob。链接：http://javascript.ruanyifeng.com/htmlapi/file.html
    var blob = new Blob(["Hello World"]);
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "hello-world.txt";
    a.textContent = "Download Hello World!";
    document.body.appendChild(a);

15, 处理字符串、数组、json、number等常见数据类型处理而封装的函数库 官网：http://lodashjs.com/docs/。

16, react 上传图像有3中方式
    ① jqyery 如果项目引的是jquery的话 可以这么玩儿：
    $.ajax({
        url: "/easytrader/personal/headUpload",
        type: "POST",
        data:formData,
        contentType:false,
        processData:false,
        error: function(){
            //alertDef("Error loading PHP document");
            alertDef("头像上传失败!");
        }

    })
    ② 这接form表单传递：
    <form action="http://www.jrdz365.com/usercenter/account/open/account" method="post" enctype="multipart/form-data">
      <input type="text" name="token" value="5a44f347ab754056b8e40d75d674cf0d" />
      <input type="text" name="realName" value="realName" />
      <input type="text" name="identity" value="identity" />
      <input type="text" name="birthday" value="birthday" />
      <input type="text" name="validdate" value="validdate" />
      <input type="file" id="input1" name="userImgs" onchange="onc()" multiple="multiple" />
      <input type="file" id="input2" name="userImgs" onchange="onc()" multiple="multiple" />
      <input type="file" id="input3" name="userImgs" onchange="onc()" multiple="multiple" />
      <input type="file" id="input4" name="userImgs" onchange="onc()" multiple="multiple" />
      <input type="file" id="input5" name="userImgs" onchange="onc()" multiple="multiple" />
    <input type="submit" />
    </form>
    ③ axios 里定义 new formData(),如果需要多图片及文件上传需要 input上添加multiple属性 并且把所有的文件放在一个数组里面 
    其它的值也可以传递 都需要 append到formData里面，还需要设定下请求头headers: {'Content-Type': 'multipart/form-data;charset=UTF-8'} 但是值传递过来的是
    文件所以不要用其它方法把formData转换为字符串类型。
      let formData = new FormData();
      let config = {
          headers: {'Content-Type': 'multipart/form-data;charset=UTF-8'}
        }
      for (let i=0;i<5;i++){
        formData.append('userImgs',aIn[i].files[0]);
      }
      formData.append('token',token);
      formData.append('realName',realName);
      formData.append('identity',identity);
      formData.append('birthday',birthday);
      formData.append('validdate',validdate);
      HttpP.NN_PlotActionP(formData,config).then(
        (res) => {
          console.log(res);
          if (res.result) {

            this.props.history.push("/pages/plot");
          }
        }
      ).catch(
        (err) => {
          alert(err);
        }
      );

17, 数组apply降维数组：apply方法会调用一个函数，apply方法的第一个参数会作为被调用函数的this值，apply方法的第二个参数（一个数组，或类数组的对象）
    会作为被调用对象的arguments值，也就是说该数组的各个元素将会依次成为被调用函数的各个参数；将该特性应用到代码中：
    function reduceDimension(arr) {
      return Array.prototype.concat.apply([], arr);
    }
    //apply试验
    var arr = [5,2,3,4,2,5];
    var ma = Math.max.apply(null,arr);//可以把数组里面的每个字遍历一遍 类似call 但是call是列表
    var maCall = Math.max.call(null,5,2,3,4);//等价上面ma。
    var mi = Math.min.apply(null,arr);//可以把数组里面的每个字遍历一遍 类似call 但是call是列表
    var miCall = Math.min.call(null,1,2,3,4);//等价上面ma。

    //es6  ...扩展运算符
    let esPMax = Math.max(...arr);//等价apply
    let esPMin = Math.min(...arr);//等价apply
    console.log(esPMin);


    const [first, ...rest] = [[1, 2, 3,], [4, 5]];  
    console.log(rest);//后者始终是数组 每值就是空数组。但是必须是数组最好一位

    //数组去重
    const uniqueArray = arr => [...new Set(arr)];
    console.log(uniqueArray(arr));

18，this.setState((prevState, props) => ({//改变state值建立在上一个值基础上 需要这么玩儿。
      counter: prevState.counter + props.increment
    }));

19，react生命周期，先调用接口index.js 里的reader()--然后找<Clock/>(其实是函数调用)--调用clock里的reader()----
    调用组件里的 componentDidMount()----由于setState改变了state的状态，就要重新渲染UI---再次调用render()----
    假如此组件不再需要挂载即 调用componentWillUnMoubt()卸载组件。

20，【高阶组件和函数式编程】--- 《浪深资源》

function hello() {
    console.log('hello jason');
}
function WrapperHello(fn) {
    return function() {
        console.log('before say hello');
        fn();
        console.log('after say hello');
    }
}
// hello 这时候等于 WrapperHello函数中返回的 匿名函数
// 在设计模式中这种操作叫做 装饰器模式
// 高阶组件也是这种操作--把一个组件传入，再返回一个新的组件
hello = WrapperHello(hello)
hello()

【react中的高阶组件】--HOC   组件就是一个函数

存在两种高阶组件： 
1.属性代理---主要进行组件的复用
2.反向集成---主要进行渲染的劫持


属性代理的典型例子：

class Hello extends React.Component {
    render() {
        return <h4>hello Jason</h4>
    }
}
function WrapperHello(Comp) {
    class WrapComp extends React.Component {
        render() {
            return (
                <div>
                    <p>这是react高阶组件特有的元素</p >
                    <Comp {...this.props}></Comp>
                </div>
            )
        }
    }
    return WrapComp;
}
Hello = WrapperHello(Hello)

还可以写成装饰器的模式，装饰器就是一个典型的属性代理高阶组件

function WrapperHello(Comp) {
    class WrapComp extends React.Component {
        render() {
            return (
                <div>
                    <p>这是react高阶组件特有的元素</p >
                    <Comp {...this.props}></Comp>
                </div>
            )
        }
    }
    return WrapComp;
}
@WrapperHello
class Hello extends React.Component {
    render() {
        return <h4>hello Jason</h4>
    }
}

反向集成： 组件和包装组件之间的关系是继承关系而不是代理的方式，可以修改原组件的生命周期，渲染流程和业务逻辑

function WrapperHello(Comp) {
    class WrapComp extends Comp {
        componentDidMount() {
            console.log('反向代理高阶组件新增的生命周期,加载完成')
        }
        render() {
            return <Comp {...this.props}></Comp>
        }
    }
    return WrapComp;
}
@WrapperHello
class Hello extends React.Component {
    componentDidMount() {
        console.log('组件加载完成')
    }
    render() {
        return <h4>hello Jason</h4>
    }
}

控制台输出：

组件加载完成
反向代理高阶组件新增的生命周期,加载完成


20， var a = 1 + 2 ; 用var申明了变量， 1 + 2 是表达式。语句以分号结尾。
21，想return返回一个对象或者数值  需要在 return后面直接写必须在同一行，假如这么写无效  
return 
{first:"Jana"} 等价于
return;
{first:"Jana"}也就是返回了空值，类似的值还有 break，throw,continue.
22，命名变量规则：第一个字符必须是字母、下划线_、或者美元符号（$）②余下的字符可以是下划线、美元符号或者任何字母或者数字
③Camel(驼峰命名法)，首字母是小写的，接下来的字母都以大写字符开头 var myText = 0；④Pascal标记法 首字母大写接下里的字母都以大写字符开头。

23，八进制 必须以0开头，其他的（0-7）假如其中一个数字大于7，则按十进制计算  十六进制是  0X开头  （0-9 A-F）超过F的字母报错。

24，任何数调用 isFinite() 方法，以确保该数不是无穷大，才可以赋值计算。

25，alert(NAN == NAN); 输出false  自身也不相等。 可以用isNaN 来判断是不是  NaN(是不是数字)。

26，ECMAScript定义的所有对象都有toString（）方法。一下是不同对象toString（）显示的结果：
①Boolean 类型的 toString() 方法只是输出 "true" 或 "false"，结果由变量的值决定：
var bFound = false;
alert(bFound.toString()); //输出 "false"
②Number 类型的 toString() 方法比较特殊，它有两种模式，即默认模式和基模式。采用默认模式，toString() 方法只是用相应的字符串输出数字值（无论是整数、浮点数还是科学计数法），如下所示：
var iNum1 = 10;
var iNum2 = 10.0;
alert(iNum1.toString());  //输出 "10"
alert(iNum2.toString());  //输出 "10"
var iNum = 10;
alert(iNum1.toString(2)); //输出 "1010"
alert(iNum1.toString(8)); //输出 "12"
alert(iNum1.toString(16));  //输出 "A"
③var array1 = [1, 2, 'a', '1a'];
console.log(array1.toString());
// expected output: "1,2,a,1a"
④booleanObject.toString() 把布尔值转换为字符串。
⑤dateObject.toString()把时间转换为字符串。

27，parseInt() 与 parseFloat() 只有对 String 类型调用这些方法，它们才能正确运行；对其他类型返回的都是 NaN。

28，对于负数参数，slice() 方法会用字符串的长度加上参数，substring() 方法则将其作为 0 处理（也就是说将忽略它）。


29，①逻辑运算符 NOT -- 标志位  开关切换 
var bFound = false;
var i = 0;
while (!bFound) {
  if (1) {
    i ++;
  }
}
② AND(&&)运算符  
var bTrue = true;
var bFalse = false;
var bResult = bTrue && bFalse;第一个运算数是 false，那么无论第二个运算数的值是什么，结果都不可能等于 true。

var bTrue = true;
var bResult = (bTrue && bUnknown);  //发生错误  第一个值是true  所以继续运算 也就报错了
alert(bResult);     //这一行不会执行
对比如下：
var bFalse = false;
var bResult = (bFalse && bUnknown);
alert(bResult);     //输出 "false"

③OR(||)运算符
var bTrue = true;
var bFalse = false;
var bResult = bTrue || bFalse;  如果第一个运算数值为 true，就不再计算第二个运算数。

var bTrue = true;
var bResult = (bTrue || bUnknown);
alert(bResult);     //输出 "true"
对比如下：
var bTrue = false;
var bResult = (bTrue || bUnknown);//发生错误 第一个值是false  所以继续运算 也就报错了
alert(bResult); //不会执行这一行

30，加法运算符（字符串有可能相当于 connect）
var result = 5 + 5; //两个数字
alert(result);    //输出 "10"
var result2 = 5 + "5";  //一个数字和一个字符串
alert(result);    //输出 "55"  为了避免这样的情况 最好封装函数先判断数据类型

31，比较运算符 字符串比大小的话 先看各个字符串第一个字符 a>b>c  但是大写字母小于小于字母 B<a.
var bResult = "Blue" < "alpha";
alert(bResult); //输出 true
var bResult = "Blue".toLowerCase() < "alpha".toLowerCase();
alert(bResult); //输出 false

注意：
var bResult = "25" < "3";
alert(bResult); //输出 "true"  这里比的是字符串  先看第一个字符  2<3即 true 
这两者的区别
var bResult = "25" < 3;
alert(bResult); //输出 "false" 这里比的是字符串与数字  先隐式转换   “25”==25<3即 false 

var bResult = "a" >= 3;
alert(bResult); //false
var bResult = "a" < 3;
alert(bResult); //false  原因是 a不是数字 也就是NaN  即都是false  NaN不等于认识东西   即全部false。

32,函数是函数对象类  具有length属性  有 toStringt()及 valueOf()方法 返回函数的源代码。
function sayHi(a,b,c,d) {
  return a + b;
}
console.log(sayHi.length);//根据参数的个数来定函数的length。

33,数组的5个迭代方法：

①every(item, index, array)：数组中的每一项运行给定函数，如果该函数的每一项都返回true，则返回true。
var  arr = [1,2,3,4,5,6];
var everyArr = arr.every(function(item,index,array){
  return item >2;
});
console.log(everyArr);//false

②filter()：对数组中的每一项运行给定函数，返回该函数会返回true的项组成的数组。
var  arr = [1,2,3,4,5,6];
var filterArr = arr.filter(function(item,index,array){
  return item >2;
});
console.log(filterArr);//[3,4,5,6]

③forEach()：对数组的每一项运行给定函数。这个方法没有返回值。
与 for () {} 类似 
var  arr = [1,2,3,4,5,6];
arr.filter(function(item,index,array){
  if (item >2) {
    console.log(item);
  }
});

④map()：对数组的每一项运行给定函数，返回每次函数调用的结果组成的数组。
var arr = [2,5,6,8,10];
var arrMap = arr.map(function(item,index,array){
  return item*2;
});
console.log(arrMap);、//[4,10,12,16,20]

⑤some()：对数组的每一项运行给定函数，如果该函数对任一项返回true，则返回true。
var arr = [2,5,6,8,10];
var someBool = arr.some(function(item,index,array){
  return item>2;
});
console.log(someBool);//true

34，数组的归并方法
①reduce()
var arr = [2,5,6,8,10];
var sum = arr.reduce(function(pre,cur,index,array){
  return pre + cur;
});
console.log(sum);

②reduceRight().
类似上面，只是开始的位置不一样。

35，时间对象
var oDate = new Date();
console.log(oDate.getTime());//时间戳 1520502376239 等价于 +oDate 即 + new Date();
console.log(oDate.getYear());//年数118  距离1990 年的年数 
console.log(oDate.getFullYear());//2018 今年年份
console.log(oDate.getMonth());//02 中国需要加+1
console.log(oDate.getDay());//星期 4 
console.log(oDate.getDate());//每个月的几号 8
console.log(oDate.getHours());//小时 17
console.log(oDate.getMinutes());//分钟 46
console.log(oDate.getSeconds());//秒 16
console.log(oDate.getMilliseconds());//毫秒 239

36，
全局函数与内置对象的属性或方法不是一个概念。全局函数它不属于任何一个内置对象。
JavaScript 中包含以下 7 个全局函数，用于完成一些常用的功能：

escape( )、eval( )、isFinite( )、isNaN( )、parseFloat( )、
parseInt( )、unescape( )。

函数作用域:看函数代码的位置，而不是看调用的位置，再去查找代码位置作用域下的参数或其他变量，从下往上找，找到了停止.

var name="global";
function foo(){
    console.log(name);
}

function fooOuter1(){
    var name="local";
    foo();
}
fooOuter1();//输出global 而不是local，并且和闭包没有任何关系

对比如下：

function fooOuter2(){
    var name="local";
    function foo(){
        console.log(name);
    }
    foo();
}
fooOuter2();//输出local 而不是global，在函数声明是name变量作用域就在其外层函数中，嗯嗯就是闭包~

37，同源策略：
它的含义是指，A网页设置的 Cookie，B网页不能打开，除非这两个网页"同源"。所谓"同源"指的是"三个相同"。
举例来说，http://www.example.com/dir/page.html这个网址，协议是http://，域名是www.example.com，端口是80（默认端口可以省略）。
同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。
限制：
1） Cookie、LocalStorage 和 IndexDB 无法读取。
2） DOM 无法获得。
3） AJAX 请求不能发送。
document.domain:假如两个网址只是二级域名不同，可用此方法设置，来达到cookie，共享。
比如：----A网页是http://w1.example.com/a.html，
B网页是http://w2.example.com/b.html，那么只要设置相同的document.domain，两个网页就可以共享Cookie。
服务器也可以在设置Cookie的时候，指定Cookie的所属域名为一级域名，比如.example.com。
Set-Cookie: key=value; domain=.example.com; path=/-----这样的话，二级域名和三级域名不用做任何设置，都可以读取这个Cookie。

38，解决跨域：三种方式
①片段识别符（fragment identifier）：URL的#号后面的部分，比如http://example.com/x.html#fragment的#fragment。如果只是改变片段标识符，页面不会重新刷新。
②window.name：这个属性的最大特点是，无论是否同源，只要在同一个窗口里，前一个网页设置了这个属性，后一个网页可以读取它。
③跨文档通信API（Cross-document messaging）：跨文档通信 API（Cross-document messaging）。这个API为window对象新增了一个window.postMessage方法，允许跨窗口通信，不论这两个窗口是否同源。
④jsonp:网页通过添加一个<script>元素，向服务器请求JSON数据，这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。
⑤cors,后台指定限制取消，跨源通信，IE10+,支持多种方式 get  post Head.

39,去除字符串空格：
方法一：使用replace正则匹配的方法

去除所有空格: str = str.replace(/\s*/g,"");      
去除两头空格: str = str.replace(/^\s*|\s*$/g,"");
去除左空格： str = str.replace( /^\s*/, “”);
去除右空格： str = str.replace(/(\s*$)/g, "");

方法二：使用str.trim()方法

str.trim()局限性：无法去除中间的空格，同理，str.trimLeft()，str.trimRight()分别用于去除字符串左右空格。

40，跨域：(1)、porxy代理
定义和用法：proxy代理用于将请求发送给后台服务器，通过服务器来发送请求，然后将请求的结果传递给前端。
实现方法：通过nginx代理；
注意点：1、如果你代理的是https协议的请求，那么你的proxy首先需要信任该证书（尤其是自定义证书）或者忽略证书检查，否则你的请求无法成功。

(2)、CORS 【Cross-Origin Resource Sharing】
定义和用法：是现代浏览器支持跨域资源请求的一种最常用的方式。
使用方法：一般需要后端人员在处理请求数据的时候，添加允许跨域的相关操作。如下：
res.writeHead(200, {
    "Content-Type": "text/html; charset=UTF-8",
    "Access-Control-Allow-Origin":*,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type'
});
(3)、jsonp
定义和用法：通过动态插入一个script标签。浏览器对script的资源引用没有同源限制，同时资源加载到页面后会立即执行（没有阻塞的情况下）。
特点：通过情况下，通过动态创建script来读取他域的动态资源，获取的数据一般为json格式。
缺点：
1、这种方式无法发送post请求（这里）
2、另外要确定jsonp的请求是否失败并不容易，大多数框架的实现都是结合超时时间来判定。

41,IE: trident内核
Firefox：gecko内核
Safari：webkit内核
Opera：以前是presto内核，Opera现已改用Google Chrome的Blink内核
Chrome：Blink(基于webkit，Google与Opera Software共同开发)

42，浏览器是如何渲染页面的？渲染的流程如下：
1.解析HTML文件，创建DOM树。
自上而下，遇到任何样式（link、style）与脚本（script）都会阻塞（外部样式不阻塞后续外部脚本的加载）。
2.解析CSS。优先级：浏览器默认设置<用户设置<外部样式<内联样式<HTML中的style样式；
3.将CSS与DOM合并，构建渲染树（Render Tree）
4.布局和绘制，重绘（repaint）和重排（reflow）

43,手机端视频或者音乐切换到别的程序时依旧在播放，解决方案：visibilitychange事件
var video = document.querySelector("#video");
video.play();
document.addEventListener('visibilitychange', function() {
  var isHidden = document.hidden;
  if (isHidden) {
    // 动画停止
    // 服务器轮询停止 等等
    video.pause();
  } else {
    // 动画开始
    // 服务器轮询
    video.play();
  }
});

44，如何居中div？如何居中一个浮动元素？如何让绝对定位的div居中？

//给div设置一个宽度，然后添加margin:0 auto属性
div{
  width:200px;
  margin:0 auto;
}
居中一个浮动元素
//确定容器的宽高 宽500 高 300 的层
//设置层的外边距
.div {
    width:500px ; height:300px;//高度可以不设
    margin: -150px 0 0 -250px;
    position:relative;         //相对定位
    background-color:pink;     //方便看效果
    left:50%;
    top:50%;
}
//让绝对定位的div居中
  position: absolute;
  width: 1200px;
  background: none;
  margin: 0 auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

45，http状态码有那些？分别代表是什么意思？
简单版
[
    100  Continue   继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息
    200  OK         正常返回信息
    201  Created    请求成功并且服务器创建了新的资源
    202  Accepted   服务器已接受请求，但尚未处理
    301  Moved Permanently  请求的网页已永久移动到新位置。
    302 Found       临时性重定向。
    303 See Other   临时性重定向，且总是使用 GET 请求新的 URI。
    304  Not Modified 自从上次请求后，请求的网页未修改过。

    400 Bad Request  服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
    401 Unauthorized 请求未授权。
    403 Forbidden   禁止访问。
    404 Not Found   找不到如何与 URI 相匹配的资源。

    500 Internal Server Error  最常见的服务器端错误。
    503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。
]

46，判断是不是数组 最好用Array.isArray(value)去取代instanceof 

47，深拷贝
// 递归实现一个深拷贝
①function deepClone(source){
   if(!source || typeof source !== 'object'){
     throw new Error('error arguments', 'shallowClone');
   }
   var targetObj = source.constructor === Array ? [] : {};
   for(var keys in source){
      if(source.hasOwnProperty(keys)){
         if(source[keys] && typeof source[keys] === 'object'){
           targetObj[keys] = source[keys].constructor === Array ? [] : {};
           targetObj[keys] = deepClone(source[keys]);
         }else{
           targetObj[keys] = source[keys];
         }
      } 
   }
   return targetObj;
}
②// 利用JSON序列化实现一个深拷贝
function deepClone(source){
  return JSON.parse(JSON.stringify(source)); //缺点：源对象的方法在拷贝的过程中丢失了
}



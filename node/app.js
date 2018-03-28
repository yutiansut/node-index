var express = require('express')
  , path = require('path')
  , task = require('./router/router.js');
var app = express();
var cookieParser = require('cookie-parser');
/* 主页 index */
app.get('/', function(req, res){
  res.sendfile('index.html');
});
/* 往数据库里添加注册的账户密码 */
app.get('/aa',task.getTask);

app.use(cookieParser());
/* 获取数据库数据*/
app.get('/bb',task.addTask);
/* 设置静态文件路径 */
app.use(express.static(path.join(__dirname, 'public')));
/* 启动服务器 */
var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("*** OneLib服务已启动，访问地址为 http://%s:%s", host, port);
});
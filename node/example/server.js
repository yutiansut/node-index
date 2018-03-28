var mysql = require('mysql')

const onelib_pool = mysql.createPool({
	host: 'localhost',
	port: '3306',
	user: 'root',
	database: 'test'
});

var sql_value_arr = [];
var sql = 'INSERT INTO login(Id,name,password) VALUES(0,?,?)';
// 获取mysql的onelib_pool连接池，以回调的方式处理（即获取成功后，执行下一步）

var express = require('express')
  , path = require('path');
var app = express();

/* 主页 */
app.get('/', function(req, res){
  res.sendfile('index.html');
});
/* 接口 */
app.get('/aa', function(req, res){
	// 输出 JSON 格式
	var response = {
	    "name":req.query.name,
	    "password":req.query.password
	};	
	sql_value_arr = [response.name,response.password];
	console.log(sql_value_arr);
  	onelib_pool.getConnection(function(err, connection) {
	      if (err) {
	          return;
	      }
	      // 获取成功后，执行query
	      // 注意到这里有三个参数，第一个是sql语句，第二个是一个数组，第三个是回调函数
	      // 需要着重说明的是第二个参数，它将依次替换sql里的“?”号
	      // sql语句被替换后，会是这样的："SELECT * FROM tasks WHERE id = " + id
	      connection.query(sql, sql_value_arr, function(err, results) {
	          if (err) {
	              return;
	          }
	          res.end(JSON.stringify(results));
	          
	      });

	      
  	});
});
/* 设置静态文件路径 */
app.use(express.static(path.join(__dirname, 'public')));

/* 启动服务器 */
var server = app.listen(3306, function(){

    var host = server.address().address;
    var port = server.address().port;

    console.log("*** OneLib智库已启动，访问地址为 http://%s:%s", host, port)
});
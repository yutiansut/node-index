//服务器配置文件
const mysql = require('mysql');//把mysql 引过来创建服务 并且自定连接 navicat
const onelib_pool = mysql.createPool({//启动node服务
	host: 'localhost',
	port: '3306',
	user: 'root',
	database: 'test'
});
module.exports = onelib_pool;

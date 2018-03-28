var mysql = require('mysql')

const db = mysql.createPool({
	host: 'localhost',
	port: '3306',
	user: 'root',
	database: 'test'
});
var  addSql = 'INSERT INTO listUrl(Id,name,url,country,num) VALUES(0,?,?,?,?)';
var  addSqlParams = ['菜鸟我', 'https://c.runoob.com', 'CN','233'];
//增
db.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        
       console.log(result);        
});
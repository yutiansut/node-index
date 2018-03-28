var mysql = require('mysql')

const db = mysql.createPool({
	host: 'localhost',
	port: '3306',
	user: 'root',
	database: 'test'
});
var  modSql = 'UPDATE  listUrl SET  name = ?, url = ? WHERE id = ?';
var  modSqlParams  = ['ffff', 'https://c.runob.com', '0'];
//增
db.query(modSql,modSqlParams ,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        
       console.log(result);        
});
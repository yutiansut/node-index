var mysql = require('mysql')

const db = mysql.createPool({
	host: 'localhost',
	port: '3306',
	user: 'root',
	database: 'test'
});
var  delSql = 'DELETE FROM listUrl where id = 0';

db.query(delSql,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        
       console.log(result);        
});
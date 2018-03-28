var mysql = require('mysql');

const db = mysql.createPool({
	host: 'localhost',
	port: '3306',
	user: 'root',
	database: 'test'
});

db.query(`SELECT * FROM listurl`, (err, data) => {
	console.log(err)
	console.log(data)
})
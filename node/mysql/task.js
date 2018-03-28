//mysql连接池封装函数
var mysql = require('../server/server.js');// 获取数据库连接配置
var Task = function() {};   // 预定义一个空的类，接下来只需要往里增加方法即可
Task.prototype.findSql = function (str) {
    return 'SELECT * FROM '+str;
};
Task.prototype.find = function(str,id,callBack) {   // 增加一个方法，名为find，传入参数为id和回调函数callback
    // sql查询语句，注意这里的“?”号，它会在query的时候被处理
    var sql = this.findSql(str);
    var sql_value_arr = [];
    // 获取mysql的onelib_pool连接池，以回调的方式处理（即获取成功后，执行下一步）
    mysql.getConnection(function(err, connection) {
        if (err) {
            callBack(true);
            return;
        }
        // 获取成功后，执行query
        // 注意到这里有三个参数，第一个是sql语句，第二个是一个数组，第三个是回调函数
        // 需要着重说明的是第二个参数，它将依次替换sql里的“?”号
        // sql语句被替换后，会是这样的："SELECT * FROM tasks WHERE id = " + id
        connection.query(sql, sql_value_arr, function(err, results) {
            if (err) {
                callBack(true);
                return;
            }
            callBack(false,results);
        });
    });
};
Task.prototype.addSql = function (str,strArr,arr) {
    var json = {};
    var arrStr = "";
    for(var i = 0; i<strArr.length;i++){
        arrStr += ( "," + strArr[i]);
    }
    json.sql = 'INSERT INTO '+str+'(Id'+arrStr+') VALUES(0,?,?)';
    console.log(json.sql)
    json.sql_value_arr = strArr;
    return json;
};
Task.prototype.add = function(str,strArr,arr,id,callBack) {   // 增加一个方法，名为find，传入参数为id和回调函数callback
    // sql查询语句，注意这里的“?”号，它会在query的时候被处理
    var sql = this.addSql(str,strArr,arr).sql;
    var sql_value_arr = arr || [];
    // 获取mysql的onelib_pool连接池，以回调的方式处理（即获取成功后，执行下一步）
    mysql.getConnection(function(err, connection) {
        if (err) {
            callBack(true);
            return;
        }
        // 获取成功后，执行query
        // 注意到这里有三个参数，第一个是sql语句，第二个是一个数组，第三个是回调函数
        // 需要着重说明的是第二个参数，它将依次替换sql里的“?”号
        // sql语句被替换后，会是这样的："SELECT * FROM tasks WHERE id = " + id
        connection.query(sql, sql_value_arr, function(err, results) {
            if (err) {
                callBack(true);
                return;
            }
            callBack(false,results);
        });
    });
};
module.exports = Task;
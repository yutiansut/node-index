// 封装路由 暴露出 以便访问
var Task = require('../mysql/task.js');
var excelObj = require("../excelData/excel.js");
var dataObj = {};
// 根据taskid获取列表url数据
dataObj.getTask = function(req, res) {
    var taskid = req.params.taskid;
    var task = new Task();
    var listUrl = "listurl";
    task.find(listUrl,taskid,function(err,result){
        if(err){
           return res.send('没有找到taskid为'+taskid+'的任务');
        }
        else if(undefined!=result){ // 增加这个判断，否则在没有查询到的情况下，Node.js会挂掉
           return res.send(result.length === 1 ? JSON.stringify(result[0]):JSON.stringify(result));
        }
        else{
           return res.end("Error");
        }
    });
}
// 获取login列表user数据
dataObj.getLoginTask = function(req, res,type) {
    var taskid = req.params.taskid;
    var task = new Task();
    var listUrl = "login";
    task.find(listUrl,taskid,function(err,result){
        if(err){
             return res.send('没有找到taskid为'+taskid+'的任务');
        }
        else if(undefined!=result){ // 增加这个判断，否则在没有查询到的情况下，Node.js会挂掉
            var loginOk = {};
            if (type) {
                loginOk.resultType = true;
                loginOk.resultList = result; 
                return res.send(JSON.stringify(loginOk));
            } else {
                loginOk.resultType = false;
                loginOk.resultList = result; 
                return res.send(JSON.stringify(loginOk));
            }
        }
        else{
                return res.end("Error");
        }
    });
}
// 根据taskid获取列表url数据
dataObj.addTask = function(req, res) {
    var taskid = req.params.taskid;
    var task = new Task();
    var regName = "login";
    var regArr = excelObj.loginarr;
    var sql_value_arr =[];
    for (var i = 0; i<regArr.length;i++) {
        sql_value_arr.push(req.query[regArr[i]]);
    }
    var loginOk = {};
    if (req.cookies.isVisit) {
        dataObj.getLoginTask(req,res,false);
    } else { 
        task.add(regName,regArr,sql_value_arr,taskid,function(err,result){
            if (err) {
                loginOk.resultType = false;
                return res.send(JSON.stringify(loginOk));
            } else if (undefined != result) { // 增加这个判断，否则在没有查询到的情况下，Node.js会挂掉
                if (result.protocol41) {
                    res.cookie('isVisit', result.insertId, {maxAge: 60*10 * 1000});
                    dataObj.getLoginTask(req,res,true);
                }
            } else {
                loginOk.resultType = false;
                return res.send(JSON.stringify(loginOk));
            }
        });  
    }
}

module.exports = dataObj;
import Mock from "mockjs";

const Random = Mock.Random;
// mock一组数据
const BigStockData = function() {
    let articles = [];
    const name  = ["恒生指数","国企指数","红筹指数","道琼斯","纳克达斯","标普500"]
    for (let i = 0; i < 3; i++) {
        let bigStockObject = {
        	bigStock_name: name[i],
            bigStockPrice:Random.float(2222.22,2567.33).toFixed(2),
            bigStockScale: Random.float(-0.99,0.99).toFixed(2),
            bigStockChange: Random.natural(100,3000),
        }
        articles.push(bigStockObject)
    }
 
    return {
        articles: articles
    }
}

export default Mock.mock('/stock/index', 'get', BigStockData);


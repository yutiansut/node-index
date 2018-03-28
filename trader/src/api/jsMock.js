import Mock from "mockjs";

const Random = Mock.Random;
// mock一组数据
const ContractObjectData = function() {
    let articles = [];
    const name  = ["美原油","美黄金","恒指","阿里巴巴","百度","腾讯","国王科技"]
    for (let i = 0; i < 7; i++) {
        let contractObject = {
        	contract_name: name[i],
            newPrice:Random.float(50.00,55.66).toFixed(2),
            priceChange: Random.float(0.10,0.99).toFixed(2),
            positions: Random.natural(100,3000),
            contract_type:Random.string( 'QWERTYUIOPLKJHGFGDS', 2 ),
        }
        articles.push(contractObject)
    }
 
    return {
        articles: articles
    }
}

export default Mock.mock('/news/index', 'get', ContractObjectData);


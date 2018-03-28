// 总路由管理页面
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';
import ContractTime from 'view/page/contractHome/contractTime';//合约--竖屏
import ContractBig  from 'view/page/contractHome/contractBig';//合约--横屏
import Handcap  from 'view/page/contractHome/handicap/handicap';//合约--盘口
import Contract from 'view/page/contractHome/contract';//合约首页
class ContractR extends React.Component {
   constructor(props){
      super(props)
      this.state = {//页面适配 根据手机大小来给定宽高
        style:{
          width:  document.documentElement.clientWidth + "px",
          height : document.documentElement.clientHeight + "px",
        }         
      };
    }
    render() {
      return (
        <div className = "contractRouter">
          <Switch>
            <Route exact path="/pages/contract" component={Contract} />
            <Route path="/pages/contract/changeBig" component={ContractBig}  />
            <Route path="/pages/contract/changeSmall" component={ContractTime}/>
            <Route path="/pages/contract/handicap" component={Handcap}/>
            <Redirect to="/pages/contract"></Redirect>
          </Switch>
        </div>
      )

  }
}

export default ContractR;

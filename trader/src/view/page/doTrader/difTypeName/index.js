// 策略页面
import React, { Component } from 'react';
import './index.css';
import {Link,withRouter} from "react-router-dom";
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
const DifTypeName = inject("plotStore")(observer(class DifTypeName extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
   
  }
  render() {
    return (
      <div className="difTypeName">
          <div className = "changeTBtn clearfix">
              <h5 className ="fl traderBtnL">交易</h5>
              <h5 className ="fl traderBtnR">跟单</h5>
          </div>
      </div>
    );
  }
}));
export default withRouter(DifTypeName);

 // <ul className = "difTypeNameList">
  //     <li className = "fl bot">期货</li>
  //     <li className = "fl">美股</li>
  //     <li className = "fl">港股</li>
  //     <li className = "fl">数字货币</li>
  // </ul>




// 策略页面
import React, { Component } from 'react';
import './index.css';
import {Link,withRouter} from "react-router-dom";
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
const FuturesMoney = inject("plotStore")(observer(class FuturesMoney extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {
   
  }
  render() {
    return (
      <div className="futuresMoney clearfix">
        <span className = "fl">权益：990338</span>
        <span className = "fl">可用：990338</span>
        <strong className = "fl">使用率：99.99%</strong>
      </div>
    );
  }
}));
export default withRouter(FuturesMoney);

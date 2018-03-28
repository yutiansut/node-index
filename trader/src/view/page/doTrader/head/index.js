// 策略页面
import React, { Component } from 'react';
import './index.css';
import {Link,withRouter} from "react-router-dom";
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
const TraderHeader = inject("plotStore")(observer(class TraderHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {
   
  }
  backPre () {
    this.props.history.goBack();
  }
  render() {
    return (
      <div className="headTitle clearfix">
          <strong className = "fl" onClick = {this.backPre.bind(this)}></strong>
          <span className = "fl">策略</span>
          <i  className = "fl"></i>
          <b  className = "fl"></b>
      </div>
    );
  }
}));
export default withRouter(TraderHeader);

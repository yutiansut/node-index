// 开户头部公共组件
import React, { Component } from 'react';
import './headTitle.css';
import {withRouter } from 'react-router-dom';//可以把router引进来 用里面的方法 如：返回上一个历史页面或者跳转到指定路由页面
class HeadTitle extends Component {
  constructor(props) {
    super(props);
  }
  backHis() {
    this.props.history.goBack();
  }
  render() {
    return (
      <div className="head_title">
          <div className="headNav"><i onClick = {this.backHis.bind(this)}></i>{this.props.titleH}</div>
          <div className={this.props.titleP ? "operationName show" : "operationName"}>{this.props.titleP}</div>
      </div>
    );
  }
}

export default withRouter(HeadTitle);

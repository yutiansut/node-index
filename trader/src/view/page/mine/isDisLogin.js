// 判断是否登录组件
import React, { Component } from 'react';
import './mine.css';
import { Link,withRouter } from 'react-router-dom';//router
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
const IsDisLogin = inject("loginStore")(observer(class IsDisLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
        "myInfo":{//登录成功后个人信息 todo:http数据接入
          name:this.props.loginStore.loginOkObj.nickname || "扯淡玩意儿",
          id:this.props.loginStore.loginOkObj.userName || "123456",
          attention:this.props.loginStore.loginOkObj.attention || 10,
          fans:this.props.loginStore.loginOkObj.fans || 10,
          mainStickers:this.props.loginStore.loginOkObj.mainStickers || 10
        },
    };
  }
  render() {
    return (
      <div className="isDisLogin">
         {localStorage.token ? (//根据是否登录状态对应的添加对应布局 1为登录 0 为未登录 又一次用到了对象调用 创建DOM
            <div className="isDisLo">
              <div className="clearfix login">
                <div className="fl headPic">
                    <span className="fl"></span>
                </div>
                <div className="fl myInfo">
                    <p className="myName">昵称：{this.state.myInfo.name}</p>
                    <p className="myId">国王牛牛账号：{this.state.myInfo.id}</p>
                </div>
                <b className="fl"></b>
              </div>
              <ul className="clearfix moreInfo">
                  <li className="fl">
                    <p>{this.state.myInfo.attention}</p>
                    <span>关注</span>
                  </li>
                  <li className="fl">
                    <p>{this.state.myInfo.fans}</p>
                    <span>粉丝</span>
                  </li>
                  <li className="fl">
                    <p>{this.state.myInfo.mainStickers}</p>
                    <span>主贴</span>
                  </li>
              </ul>
            </div>
            ):(
            <div className="isDisLo">
              <div className="clearfix noLogin">
                <div className="fl headPic">
                </div>
                <Link className="fl loginBtn" to="/mainLogin/login"></Link>
                <Link className="fl registeredBtn" to="/mainLogin/register" ></Link>
                <b className="fl"></b>
              </div>
              <ul className="clearfix moreInfo">
                  <li className="fl">
                    <p>--</p>
                    <span>关注</span>
                  </li>
                  <li className="fl">
                    <p>--</p>
                    <span>粉丝</span>
                  </li>
                  <li className="fl">
                    <p>--</p>
                    <span>主贴</span>
                  </li>
              </ul>
            </div>
            )
          }
      </div>
    );
  }
}));

export default withRouter(IsDisLogin);

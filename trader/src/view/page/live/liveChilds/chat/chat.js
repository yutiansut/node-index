//直播里面聊天窗口
import React, { Component } from 'react';
import './chat.css';
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {//默认数据 真正数据需要后台socket提供 TODO：用mobx管理这里的数据
      chatListArr:[{
        picPath:"",
        nav:"特兰普发顺丰第三方反倒是反倒是反倒是反倒是 反倒是",
        type:0
      },{
       picPath:"",
        nav:"特兰普发顺丰第三方反倒是反倒是反倒是反倒是 反倒是特兰普发顺丰第三方反倒是反倒是反倒是反倒是 反倒是",
        type:0
      },{
        picPath:"",
        nav:"特兰普发顺丰第三方反倒是反倒是反倒是反倒是 反倒是",
        type:0
      },{
       picPath:"",
        nav:"特兰普发顺丰第三方反倒是反倒是反倒是反倒是 反倒是",
        type:1
      },{
        picPath:"",
        nav:"特兰普发顺丰第三方反倒是反倒是反倒是反倒是 反倒是",
        type:1
      },]
    };
  }
  render() {
    
    return (
      <div className="listC">
        <div className="listChat">
          <ul className="chatList">
             {
              this.state.chatListArr.map((name,index)=>(
                <li key={index} className="clearfix" >
                  <i style={{float:name.type ? "right":"left"}}></i>
                  <span style={{float:name.type ? "right":"left"}}>{name.nav}</span>
                </li>
              ))
             }
          </ul>
        </div>
        <div className=" clearfix chatBtn">
          <i></i>
          <span className="fl">聊一聊</span>
        </div>
      </div>
    );
  }
}

export default Chat;

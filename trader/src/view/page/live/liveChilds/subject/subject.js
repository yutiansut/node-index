//直播里面课程窗口
import React, { Component } from 'react';
import './subject.css';
class Subject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectListArr:[{//默认数据 真正数据需要后台http提供 TODO：用mobx管理这里的数据
        time:"14:00-15:00直播",
        teacher:"特兰普",
        nav:"为啥败家"
      },{
       time:"14:00-15:00直播",
        teacher:"特兰普",
        nav:"为啥败家"
      },{
       time:"14:00-15:00直播",
        teacher:"特兰普",
        nav:"为啥败家"
      },{
      time:"14:00-15:00直播",
        teacher:"特兰普",
        nav:"为啥败家"
      },{
        time:"14:00-15:00直播",
        teacher:"特兰普",
        nav:"为啥败家"
      },]
    };
  }
  render() {
    return (
      <div className="list">
        <ul className="subjectList">
           {
            this.state.subjectListArr.map((name,index)=>(
              <li key={index} className="clearfix" >
                <i className="fl">{name.time}</i>
                <b className="fl">{name.teacher}</b>
                <span className="fl">{name.nav}</span>
              </li>
            ))
           }
        </ul>
      </div>
    );
  }
}
export default Subject;

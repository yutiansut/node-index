//直播里面新闻窗口
import React, { Component } from 'react';
import './news.css';
class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsListArr:[{////默认数据 真正数据需要后台http提供 TODO：用mobx管理这里的数据
        picPath:"",
        nav:"第三方第三方第三方十大十大电风扇反倒是发送到反倒是",
        time:"5小时前"
      },{
        picPath:"",
        nav:"第三方第三方第三方十大十大电风扇反倒是发送到反倒是",
        time:"5小时前"
      },{
        picPath:"",
        nav:"第三方第三方第三方十大十大电风扇反倒是发送到反倒是",
        time:"5小时前"
      },{
        picPath:"",
        nav:"第三方第三方第三方十大十大电风扇反倒是发送到反倒是",
        time:"5小时前"
      },{
        picPath:"",
        nav:"第三方第三方第三方十大十大电风扇反倒是发送到反倒是",
        time:"5小时前"
      },]
    };
  }
  render() {
    
    return (
      <div className="list">
        <ul className="newsList">
         {
          this.state.newsListArr.map((name,index)=>(
            <li key={index} className="clearfix" >
              <i></i>
              <p>{name.nav}</p>
              <span>{name.time}</span>
            </li>
          ))
         }
        </ul>
      </div>
      
    );
  }
}

export default News;

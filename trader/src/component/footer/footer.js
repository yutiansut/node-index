//项目footer 点击不同的icon 当前的icon需要变黄色 5个页面都有也就拿出来做公共组件
import React, { Component } from 'react';
import './footer.css';
import { withRouter } from 'react-router-dom';//router //点击切换 用的是路由 即把每个icon对应的链接写在下面一个数组colorObj里面 
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
const Footer = inject("plotStore")(observer(class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorObj:[{//存储的是footer 的className 及路由路劲 此处做个小逻辑：当循环数组创建DOM的时候 判断父级传过来的名称跟当前的className是不是相等
        //相等的话说明在当前页面 也就要把icon 变黄。所以在css里面写了两套样式 高亮样式只是在原有className上字符串拼接+1 this.props.typeColor+"1"
        claName:"quotes",
        path:"/pages/contract"
      },
      {
        claName:"game",
        path:"/pages/game"
      },
      {
        claName:"plot", 
        path:"/pages/plot"
      },
      {
        claName:"live",
        path:"/pages/live"
      },
      {
        claName:"myPort",
        path:"/pages/mine"
      }]
    };
  }
  toPathClick (index,path) {
      this.props.history.push(path);
  }
  render() { 
    return (
      <div className=" clearfix contractFoot">
          {
            this.state.colorObj.map((name, index) => 
              <p  onClick = {this.toPathClick.bind(this,index,name.path)} className={(name.claName==this.props.typeColor) ? this.props.typeColor+"1" : name.claName} key={index}></p>
            )
          }
      </div>
    );
  }
}));
export default withRouter(Footer);

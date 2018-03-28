// 总路由管理页面
import React from 'react';
// import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { Provider } from 'mobx-react';//整合状态
import stores from 'router';//状态的集合
import 'style/index.css';
import RouterAll from 'view/router/routerAll.js';
import FastClick from '../mixin/fastclick.js';
class App extends React.Component {
   constructor(props){
      super(props)
      this.state = {//页面适配 根据手机大小来给定宽高
        style:{
          width:  document.documentElement.clientWidth + "px",
          height : document.documentElement.clientHeight + "px",
        }         
      };
    }
    componentDidMount() {
      if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
          FastClick.attach(document.body);
        }, false);
      }
    }
    render() {
      return (
        <Provider {...stores}>
          <Router>
            <div className="contract" style={this.state.style} >
              <Route path="/" component={RouterAll} />
            </div>
          </Router>
        </Provider>
      );
  }
}
export default App;

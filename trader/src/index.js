// 项目入口文件
import React from 'react';
import ReactDOM from 'react-dom';
import App from './router';
import FastClick from './mixin/fastclick';
class Index extends React.Component {//处理手机端点击事件问题---FastClick
	componentDidMount() {
		if ('addEventListener' in document) {
			document.addEventListener('DOMContentLoaded', function() {
				FastClick.attach(document.body);
			}, false);
		}
	}
	render() {
		return (
		  <div>
		    <App />
		  </div>
		);
	}
}
ReactDOM.render(<Index />, document.getElementById('root'));

 
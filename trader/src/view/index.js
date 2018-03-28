//入口引导页
import React, { Component } from 'react';
import './style/index.css';
import { Link } from 'react-router-dom';//router
import ReactSwipe from 'react-swipe';//swiper
import {observer,inject} from 'mobx-react';//mobx管里页面 可以inject为父级传过来的props
const Entrance = inject("loginStore")(observer(class Entrance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeCount:0,
      "default":0,//根据这个值来判断当前元素处于目标状态
      adNavList:[{
        clName:"adlist1"
      },
      {
        clName:"adlist2"
      },
      {
        clName:"adlist3"
      }]
    };
  }
  componentDidMount() {
    let self=this;//定时器里的this是全局的 react 不是当前的目标 需要转换一下。
    this.interval = setTimeout(function(){
        self.setState({
          timeCount:1
        })
    },2000);
  }
  componentWillUnmount() {//生命周期结束把定时器关掉
      clearInterval(this.interval);
  }
  render() { 
    const self = this;
    const swipeOptions = {//swiper 控制参数  移动 速度等等
      initialSlide:this.state.default,//默认显示slide位置
      continuous: true,
      speed: 1000,
      transitionEnd() {//运动结束事件 这里的this指向的是 react插件 所以有用self转换一下 
        const num = this.target.getAttribute("data-index");//当前元素的属性获取下标 这里的this指向的是 events事件对象
        self.setState({
          "default" : num
        });
      }
    }
    return (
      <div className="clearfix entrance">
        <div className={this.state.timeCount ? "entranceBg hide" :"entranceBg"}>
            <h2><a href="javascript:;;">国王牛牛</a></h2>
            <div className="entranceBottom">
                <h3>国王科技 官方交易软件</h3>
                <p>Copring@2017Funluc.All righta Reserved</p>
            </div>
        </div>
        <div className="entranceSwiper">
          <div className="adSwiper">
            <ReactSwipe className="adNavStone" swipeOptions={swipeOptions} >
                {
                   this.state.adNavList.map((name, index) => 
                    <div className={name.clName} key={index}></div>
                  )
                }
            </ReactSwipe>
            <Link className="quickStart" to="/pages/contract"></Link>
            <div className=" clearfix adFooter">
              {
                this.state.adNavList.map((name, index) => 
                  <span className={(index==this.state.default) ? "spanCol" : ""}  key={index}></span>
                )
              }
            </div>
          </div>
          <div className="adLoginRoute">
              <div className="clearfix adLoginRouteBtn">
                  <div className="fl" ><Link className="reg" to="/mainLogin/register">注册</Link></div>
                  <div className="fl" ><Link className="fl log" to="/mainLogin/login">登录</Link></div>
              </div>
              <div className="clearfix adLoginRoutePic">
                  <span className="fl"></span>
                  <i className="fl"></i>
              </div>
          </div>
        </div>
      </div>
    );
  }
}));
export default Entrance;

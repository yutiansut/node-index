//直播页面--这个页面分三块（直播，新闻，课程），这三块单独拿了出去在liveChild文件里
import React, { Component } from 'react';
import './live.css';
import Footer from 'com/footer/footer';//footer模拟数据
import videojs from 'video.js';//视屏组件 TODO：现在只是默认样式 还需要按需求修改功能
import 'video.js/dist/video-js.css';//视屏组件 TODO：现在只是默认样式 还需要按需求修改样式
import ReactSwipe from 'react-swipe';//swiper 做三个子级的点击及滑动切换 两个swiper做的关联
import News from './liveChilds/news/news';//News子级
import Chat from './liveChilds/chat/chat';//Chat子级
import Subject from './liveChilds/subject/subject';//Chat子级
class Live extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "default":0,//根据这个值来判断当前元素处于目标状态（下划线黄色）
      "colorType":"live",//传给footer
      a:ReactSwipe,
      option:{//视频配置文件
        autoplay: true,
        controls: true,
        sources: [{
          src: 'http://vjs.zencdn.net/v/oceans.mp4',
          type: 'video/mp4'
        }]
      },
      "LiveTabArr":[{//第一个swiper 切换按钮
        style:{marginLeft:"1.61rem"},
        htMl:"新闻",
      },{
        style:{marginLeft:"2.38rem",marginRight:"2.2rem"},
        htMl:"直播",
      },{
        style:{},
        htMl:"课程",
      }],
      "LiveNavArr":[{//第二个swiper 切换内容 此处用了react函数创建 及可以把子组件作为函数传入对应的位置---函数htmltab（）下面循环添加调用即可
        style:{height:"8rem"},
        htmltab:() => (
          <News />
        ),
      },{
        style:{height:"8rem"},
        htmltab:() => (
          <Chat />
        ),
      },{
        style:{height:"8rem"},
        htmltab:() => (
          <Subject />
        ),
      }]
    };
  }
  componentDidMount () {//视频组件在此处创建
    // instantiate video.js
    this.player = videojs(this.videoNode, this.state.option, function onPlayerReady () {
      // console.log('onPlayerReady', this)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    })
    // this.player.play();
  }
  componentWillUnmount () {//视频组件在此处销毁
    if (this.player) {
      this.player.dispose();
    }
  }
  //转换slide事件(切换不同的Vide)
  clickSlide(index) {//点击修改选项卡对应的下标
    this.setState({
      "default" : index  
    });
    this.reactSwipe.slide(index,600);//下标变换是 强制另一个swiper 移动到相应下标的位置 slide swiper自带的方法 此处的this.reactSwiper是靠react的ref修正的
  }
  render() {
    //video 宽高需要用属性控制
    const vHeight = document.documentElement.clientHeight*0.38;
    const vWidth = document.documentElement.clientWidth;
    const self = this;
    const swipeOptions = {//swiper 控制参数  移动 速度等等
      initialSlide:this.state.default,//默认显示slide位置
      transitionEnd:false,
      continuous: true,
      speed: 600,
      transitionEnd() {//运动结束事件 这里的this指向的是 react插件 所以有用self转换一下 
        const num = this.target.getAttribute("data-index");//当前元素的属性获取下标 这里的this指向的是 events事件对象
        self.setState({
          "default" : num
        });
      }
    }
    return (
      <div className="LiveRute">
          <div className="homeHead hB">直播</div>
          <div className="player">
              <video  ref={node => this.videoNode = node} className='video-js' width={vWidth} height={vHeight}/>
          </div>
          <div className="liveTab">
            <ReactSwipe className="liveTabBtn">
              <div className="clearfix">
                {
                  this.state.LiveTabArr.map((name, index) => 
                    <span  style={name.style} key={index} className={(index==this.state.default)?"liveTabBtnActive":"liveTabBtnSpan"} onClick={this.clickSlide.bind(this,index)}>{name.htMl}</span>
                  )
                }
              </div>
            </ReactSwipe>
          </div>
          <div className="liveNav">
            <ReactSwipe className="liveNavStone" swipeOptions={swipeOptions} id="reactSwipe" ref={reactSwipe => this.reactSwipe = reactSwipe}>
                {
                  this.state.LiveNavArr.map((name, index) => 
                    <div className="liveNavList" style={name.style} key={index}>{name.htmltab()}</div>
                  )
                }
            </ReactSwipe>
          </div>
          <Footer typeColor={this.state.colorType} />
      </div>
    );
  }
}

export default Live;

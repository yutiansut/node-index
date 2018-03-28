//游戏界面--游戏没有引进react里面 点击直接跳的是连接
import React, { Component } from 'react';
import './game.css';
import Footer from 'com/footer/footer';//footer模拟数据
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "colorType":"game",//传给footer
      gameLstArr:[{
        gameName:"国旗大战",
        gamePivClassName:"flagPic",
        caption:"交易累了或者交易失败，换个心情也许会好转",
        url:"http://www.jrdz365.com/easytrader/luckydraw/rotary"
      },{
        gameName:"金融德州",
        gamePivClassName:"pokerPic",
        caption:"游戏规则类似交易，你想提高自己的交易心态吗？",
        url:"http://www.jrdz365.com/easytrader/room/checkPokerRroom"
      }]
    };
  }
  render() { 
    return (
      <div className="gameRute">
          <div className="homeHead">游戏</div>
          <div className="gameTypeList">
            <ul className="game_list">
              {
                this.state.gameLstArr.map((name, index) => 
                  <li key={index}>
                    <a href={name.url}>
                      <span>{name.gameName}</span>
                      <p>{name.caption}</p>
                      <i className={name.gamePivClassName}></i>
                      </a>
                  </li>
                )
              }
            </ul>
          </div>
          <div className="moreGame">更多游戏惊醒期待~</div>
          <Footer typeColor={this.state.colorType} />
      </div>
    );
  }
}

export default Game;

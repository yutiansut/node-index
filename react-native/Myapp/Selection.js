import React,{ Component } from "react";
import { Animated,AppRegistry, StyleSheet,Text,View, TouchableOpacity,Image} from "react-native";
export default class SelectionF extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim:new Animated.Value(0),
      position:new Animated.Value({}),
    };
  }
  static navigationOptions = {
      title: 'fetched',
  };
  _onPress () {
    alert(111)
  }
  componentDidMount(){
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue:1,
        duration: 3000,
      }
    ).start();
  }
  moving(){
    Animated.sequence([            // 首先执行decay动画，结束后同时执行spring和twirl动画
      Animated.decay(this.state.position, {   // 滑行一段距离后停止
        velocity: {x: gestureState.vx, y: gestureState.vy}, // 根据用户的手势设置速度
        deceleration: 0.997,
      }),
      Animated.parallel([          // 在decay之后并行执行：
        Animated.spring(this.state.position, {
          toValue: {x: 0, y: 0}    // 返回到起始点开始
        }),
        Animated.timing(twirl, {   // 同时开始旋转
          toValue: 360,
        }),
      ]),
    ]).start();                    // 执行这一整套动画序列
  }
  render () {
    return (
      <View>
        <View style = {styles.widthflexf}>
          <View style={{width:50,height:50,marginLeft:10,backgroundColor:"red"}}></View>
          <View style={{width:50,height:50,marginLeft:10,backgroundColor:"skyblue"}}></View>
          <View style={{width:50,height:50,marginLeft:10,backgroundColor:"steelblue"}}></View>
        </View>
        <TouchableOpacity onLongPress={this._onPress}>
          <Image
            style={{backgroundColor:"#fff"}}
            source={require('./image/pocker_room_btn_bg.png')}
          />
        </TouchableOpacity>
        <Animated.Text onPress={this.moving} style={{width:100,height:100,marginBottom:10,backgroundColor:"green"}}></Animated.Text>
        <Animated.Text  style={{width:100,height:100,fontSize:20,color:"red",opacity:this.state.fadeAnim}}>{"玩sad奥术大师爱迪生 大安市"}</Animated.Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  widthflexf:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"flex-start",
    marginTop:25,
    marginLeft:10,
  },
  widthflex:{
    flex:1
  },
  bigblue:{
    color:"blue",
    fontWeight:"bold",
    fontSize:30,
    flex:2
  },
  red:{
    flex:3,
    margin:15,
    color:"red",
  },
  container: {
   width:400,
   height:400,
   backgroundColor:"green",
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
AppRegistry.registerComponent("SelectionF",()=>SelectionF);

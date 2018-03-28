import React,{ Component } from "react";
import { AppRegistry, StyleSheet,Text, Image, View, TextInput, ScrollView, FlatList, Button} from "react-native";
class Greeting extends Component {
  render() {
    return (
      <Text style= {styles.bigblue}>HEllo {this.props.name} !!!!</Text>
    )
  }
}
class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = { showText :true };

    setInterval(() => {
      this.setState(previousState => {
        return { showText : !previousState.showText};
      })
    },1000);
  }
  render() {
    let display = this.state.showText ? this.props.text : " ";
    return (
      <Text style= {styles.bigblue}>{display}</Text>
    )
  }
}
class TextInp extends Component {
  constructor (props) {
    super(props);
    this.state = {
      text:" ",
    }
  }
  render () {
    return (
      <View style = {{padding:10}}>
          <TextInput style = {{
            height:40,
            width:200,
            borderWidth:2,
            borderColor:"red",
            borderStyle:"solid"
          }} 
          placeholder = "请输入汉字"
          onChangeText = {(text) =>{this.setState({text})}}
          />
          <Text style={{padding:10,fontSize:42}}>{
            this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
          </Text>
      </View>
    )
  }
}
class ListBasics extends Component {
  render(){
    return (
      <View style={styles.container}>
        <FlatList 
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={
            ({item}) => <Text style={styles.item}>{item.key}</Text>
          }
        />
      </View>
    )
  }
}
export default class AppMain extends Component {
  static navigationOptions = {
         title: 'Kings',
     };
  constructor(props) {
      super(props);
      this.state={
          title:"提交",
      };
  }
  fetchData = () => {
      fetch("http://bbs.reactnative.cn/api/category/3")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({title:responseJson.topics[0].title});
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render () {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    const { navigate } = this.props.navigation;
    return (
      <View>
        <View style = {styles.widthflexf}>
          <View style={{width:50,height:50,marginLeft:10,backgroundColor:"red"}}></View>
          <View style={{width:50,height:50,marginLeft:10,backgroundColor:"skyblue"}}></View>
          <View style={{width:50,height:50,marginLeft:10,backgroundColor:"steelblue"}}></View>
        </View>
        <TextInp />
        <ListBasics />
        <Text onPress={() => navigate('Profile')} style = {{fontSize:20,color:"red",marginLeft:170,}}>测试</Text>
        <Text></Text>
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
   height:350,
   backgroundColor:"green",
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
AppRegistry.registerComponent("AppMain",()=>AppMain);

// <Text style= {styles.red} >Hello world好得很粉红色的发生部分第三方博士的但是反倒是反倒是电风扇反倒是反倒是反倒是方式反倒是!</Text>
//         <Image  source = {pic} style={{width:193,height:70}} />
//         <Greeting  name="王浩" />
//         <Greeting  name="王伟" />
//         <Greeting  name="王伟浩" />
//         <Blink style= {styles.bigblue} text="哈哈啊哈哈哈哈" />
// <ScrollView >
  
//           <Text style={{fontSize:26}}>Scroll me plz</Text>
//           <Image source={require('./image/weixin.png')} />
//           <Image source={require('./image/weixin.png')} />
//           <Image source={require('./image/weixin.png')} />
//           <Image source={require('./image/weixin.png')} />
//           <Image source={require('./image/weixin.png')} />
//           <Text style={{fontSize:26}}>If you like</Text>
//           <Image source={require('./image/weixin.png')} />
//           <Image source={require('./image/weixin.png')} />
//           <Image source={require('./image/weixin.png')} />
//           <Image source={require('./image/weixin.png')} />
//           <Image source={require('./image/weixin.png')} />
//           <Text style={{fontSize:26}}>Scrolling down</Text>
//           <Image source={require('./image/weixin.png')} />
//           <Image source={require('./image/weixin.png')} />
//           <Image source={require('./image/weixin.png')} />
//           <Image source={require('./image/weixin.png')} />
//           <Image source={require('./image/weixin.png')} />
//           <Text style={{fontSize:26}}>What's the best</Text>
//           <Image source={require('./image/weixin.png')} />
//           <Image source={require('./image/weixin.png')} />
//           <Image source={require('./image/weixin.png')} />
//           <Image source={require('./image/weixin.png')} />
//           <Image source={require('./image/weixin.png')} />
//           <Text style={{fontSize:26}}>Framework around?</Text>
//           <Image source={require('./image/weixin.png')} />
//           <Image source={require('./image/weixin.png')} />
//           <Image source={require('./image/weixin.png')} />
//           <Image source={require('./image/weixin.png')} />
//           <Image source={require('./image/weixin.png')} />
//           <Text style={{fontSize:20}}>React Native</Text>
// </ScrollView>
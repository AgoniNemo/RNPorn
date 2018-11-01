import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ImageBackground,Dimensions,Image,TextInput} from 'react-native';
import {Button, InputItem, List,Toast} from 'antd-mobile-rn';
import { requestLogin } from 'src/Api';
// import { TextInput } from 'src/Components/Public/index.js';

let {height, width} = Dimensions.get('window');


type Props = {};
export default class Login extends Component<Props> {

  static navigationOptions = {
    headerTitle: 'Login页面',
  };
  constructor(props){
    super(props)
    this.state={
      userName:null,
      password:null
    }
  }

  render() {
    return (
      <ImageBackground style={styles.container}
       source={require('assets/image/back.png')} resizeMode='cover'>
        <View style={styles.inputContaner}>
          {/* <TextInput source={'assets/image/user.png'} placeholder={'用户名'}/> */}
          <View style={styles.userInput}>
            <Image source={require('assets/image/user.png')} style={styles.image}/>
            <TextInput style={styles.textInput} placeholder={'用户名'} onChangeText={(value)=> this.setState({userName:value})} placeholderTextColor={'white'}/>
          </View>
          <View style={styles.passworInput}>
            <Image source={require('assets/image/password.png')} style={styles.image}/>
            <TextInput style={styles.textInput}  placeholder={'密码'} onChangeText={(value)=> this.setState({password:value}) } placeholderTextColor={'white'} secureTextEntry/>
          </View>
          <Button type='primary' size={'large'} style={styles.loginBtn} activeStyle={styles.btnSelect} onClick={() => this.loginClick()}>登陆</Button>
        </View>
      </ImageBackground>
    )
  }
  

  loginClick() {
    Toast.loading('加载中...',20000,(() => {}),true)
    this.loginAction()
  }

  loginAction() {
    let param = {
      user: this.state.userName,
      password:this.state.password
    }
    console.log(param);
    requestLogin(param).then(res => {
      console.log(res);
      Toast.hide()
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputContaner: {
    width:(height-20)/2,
  },
  image: {
    width:41/2,
    height:29/2,
    top:15,
    marginRight:10
  },
  userInput: {
    marginBottom:10,
    padding: 0,
    borderBottomWidth:1,
    borderBottomColor: 'white',
    flexDirection: 'row',
    
  },
  passworInput: {
    padding: 0,
    borderBottomColor: 'white',
    borderBottomWidth:1,
    flexDirection: 'row',
  },
  textInput: {
    color:'white',
    fontSize:17,
    flex:1
  },
  loginBtn: {
    marginTop: 20,
    backgroundColor:'rgb(201,39,143)',
    borderColor:'rgb(201,39,143)',
    height:44,
    opacity:0.8,
  },
  btnSelect: {
    backgroundColor:'rgb(201,39,143)',
    borderColor:'rgb(201,39,143)'
  }
});
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ImageBackground,Dimensions,TextInput,Image} from 'react-native';
import {Button, InputItem, List,Toast} from 'antd-mobile-rn';
import { requestLogin } from 'src/Api';

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
          <View style={styles.userInput}>
            <Image source={require('assets/image/user.png')} style={styles.image}/>
            <TextInput style={styles.textInput} placeholder={'用户名'} onChange={(value)=>{this.state.userName = value;}} placeholderTextColor={'white'}/>
          </View>
          <View style={styles.passworInput}>
            <Image source={require('assets/image/password.png')} style={styles.image}/>
            <TextInput style={styles.textInput}  placeholder={'密码'} onChange={(value)=>{this.state.password = value;}} placeholderTextColor={'white'}/>
          </View>
          <Button type='primary' size={'large'} style={styles.loginBtn} activeStyle={styles.btnSelect} onClick={() => this.loginClick()}>登陆</Button>
        </View>
      </ImageBackground>
    )
  }


  loginClick() {
    Toast.success('这是提示',1)
    requestLogin({user:'Nemo',password:'123456'}).then(res => {
      console.log(res);
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
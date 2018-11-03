import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ImageBackground,Dimensions,Image} from 'react-native';
import {Button,Toast} from 'antd-mobile-rn';
import { requestLogin } from 'src/Api';
import { TextInput,color,SCREEN } from 'components/Public';

export default class Login extends Component{

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
          <TextInput source={require('assets/image/user.png')} placeholder={'用户名'} callBackFunc={(value)=> this.setState({userName:value})}/>
          <TextInput source={require('assets/image/password.png')} placeholder={'密码'} callBackFunc={(value)=> this.setState({password:value})} secureTextEntry={true}/>
          <Button type='primary' size={'large'} style={styles.loginBtn} activeStyle={styles.btnSelect} onClick={() => this.loginClick()}>登陆</Button>
        </View>
      </ImageBackground>
    )
  }
  
  text(value) {
    console.log('====',value);
    
  }
  loginClick() {
    Toast.loading('加载中...',0,(()=>{}),true)
    this.loginAction()
  }

  loginAction() {
    let param = {
      user: this.state.userName,
      password:this.state.password
    }
    console.log(param);
    // requestLogin(param).then(res => {
    //   console.log(res);
    //   Toast.hide()
    // })
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
    width:SCREEN.width-2*30,
  },
  loginBtn: {
    marginTop: 20,
    backgroundColor:color.theme,
    borderColor:color.theme,
    height:44,
    opacity:0.8,
  },
  btnSelect: {
    backgroundColor:color.theme,
    borderColor:color.theme
  }
});
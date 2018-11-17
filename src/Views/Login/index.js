import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ImageBackground,Dimensions,Image} from 'react-native';
import {Button,Toast} from 'antd-mobile-rn';
import { requestLogin } from 'src/Api';
import { TextInput,Color,SCREEN } from 'components/Public';
import UserManage from 'lib/UserManage';

export default class Login extends Component{

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
          <Button type='primary' size={'large'} style={styles.loginBtn} activeStyle={styles.btnSelect} onClick={this.loginClick.bind(this)}>登陆</Button>
        </View>
      </ImageBackground>
    )
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
    let user = {
       token:'34245354',
       name:'dffdsafas',
    }
    UserManage.save(user);
    console.log(this.props);
    this.props.navigation.navigate('MainTab');
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
    backgroundColor:Color.theme,
    borderColor:Color.theme,
    height:44,
    opacity:0.8,
  },
  btnSelect: {
    backgroundColor:Color.theme,
    borderColor:Color.theme
  }
});
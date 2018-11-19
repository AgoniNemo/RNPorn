import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Platform, StyleSheet, Text, View,ImageBackground,Dimensions,Image} from 'react-native';
import {Button,Toast} from 'antd-mobile-rn';
import { requestLogin } from 'src/Api';
import { TextInput,Color,SCREEN } from 'components/Public';
import UserManage from 'lib/UserManage';
import { USER_ACTION } from 'reduxs/action/action';

class Login extends Component{

  constructor(props){
    super(props)
    this.state={
      isUpdate:false
    }
    
  }

  render() {
    const { user } = this.props
    return (
      <ImageBackground style={styles.container}
       source={require('assets/image/back.png')} resizeMode='cover'>
        <View style={styles.inputContaner}>
          <TextInput source={require('assets/image/user.png')} defaultValue={((user != null) ? user.user :'')} placeholder={'用户名'} callBackFunc={(value)=> user.user = value}/>
          <TextInput source={require('assets/image/password.png')} defaultValue={((user != null) ? user.password :'')} placeholder={'密码'} callBackFunc={(value)=> user.password = value} secureTextEntry={true}/>
          <Button type='primary' size={'large'} style={styles.loginBtn} activeStyle={styles.btnSelect} onClick={this.loginClick.bind(this)}>登陆</Button>
        </View>
      </ImageBackground>
    )
  }

  componentDidMount() {
    console.log(this.props);
  }
  
  loginClick() {
    if (this.props.user.user == undefined || this.props.user.user == '') {
      Toast.show('账号不能为空',1)
      return
    }
    if (this.props.user.password == undefined || this.props.user.password == '') {
      Toast.show('密码不能为空',1)
      return
    }
    this.loginAction()
  }

  loginAction() {
    let param = {
      user: this.props.user.user,
      password: this.props.user.password
    }
    Toast.loading('加载中...',0,(()=>{}),true)
    requestLogin(param).then(res => {
      console.log(res);
      const user = {
        ...this.props.user,
        ...res.data
      }
      UserManage.update(user);
      if (res.code == '0') {
        this.props.changeUser(user)
        this.props.navigation.navigate('MainTab',{
          user:user
        });
      }else{
        Toast.show(res.message,1)
      }
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

const mapStateToProps = (state) => {
  return {
      user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {    
  return {
      changeUser: (usr) => dispatch({type: USER_ACTION,user:usr}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
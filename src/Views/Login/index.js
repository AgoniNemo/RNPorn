import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Platform, StyleSheet, Text, View,ImageBackground,Dimensions,Image,Keyboard} from 'react-native';
import {Button,Toast} from 'antd-mobile-rn';
import { requestLogin } from 'src/Api';
import { TextInput,Color,SCREEN } from 'components/Public';
import UserManage from 'lib/UserManage';
import { USER_ACTION , APP_STATUS_ACTION} from 'reduxs/action';

class Login extends Component{

  render() {
    const { userModel } = this.props;
    return (
      <ImageBackground style={styles.container}
       source={require('assets/image/back.png')} resizeMode='cover'>
        <View style={styles.inputContaner}>
          <TextInput source={require('assets/image/user.png')} defaultValue={userModel.user} placeholder={'用户名'} callBackFunc={(value)=> userModel.user = value}/>
          <TextInput source={require('assets/image/password.png')} defaultValue={userModel.password} placeholder={'密码'} callBackFunc={(value)=> userModel.password = value} secureTextEntry={true}/>
          <Button type='primary' size={'large'} style={styles.loginBtn} activeStyle={styles.btnSelect} onClick={this.loginClick.bind(this)}>登陆</Button>
        </View>
      </ImageBackground>
    )
  }

  componentDidMount() {
      UserManage.get().then(user => {
        if (user) {
            this.loginClick()
        }
      })
  }
  
  loginClick() {
    if (this.props.userModel.user == undefined || this.props.userModel.user == '') {
      Toast.show('账号不能为空',1)
      return
    }
    if (this.props.userModel.password == undefined || this.props.userModel.password == '') {
      Toast.show('密码不能为空',1)
      return
    }
    this.loginAction()
  }

  loginAction() {
    console.log('=====loginAction=====');
    
    let param = {
      user: this.props.userModel.user,
      password: this.props.userModel.password
    }
    Keyboard.dismiss();
    Toast.loading('加载中...',0,(()=>{}),true)
    requestLogin(param).then(res => {
      const user = {
        password:param.password,
        ...res.data
      }
      UserManage.save(user);
      if (res.code == '0') {
        this.props.changeUser(user)
        this.props.changeStatus(true)
        this.props.navigation.navigate('MainTab',{
          user:user,
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
      userModel: state.userModel,
      status: state.status,
  }
}

const mapDispatchToProps = (dispatch) => {    
  return {
      changeUser: (userModel) => dispatch({type: USER_ACTION,userModel:userModel}),
      changeStatus: (status) => dispatch({type: APP_STATUS_ACTION,status:status}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
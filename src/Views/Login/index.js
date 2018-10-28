import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ImageBackground,Dimensions,TextInput} from 'react-native';
import {Button, InputItem, List,Toast} from 'antd-mobile-rn';

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
            <TextInput style={{color:'white'}} placeholder={'用户名'} onChange={(value)=>{this.state.userName = value;}} placeholderTextColor={'white'}/>
          </View>
          <View style={styles.passworInput}>
            <TextInput style={{color:'white'}}  placeholder={'密码'} onChange={(value)=>{this.state.password = value;}} placeholderTextColor={'white'}/>
          </View>
          <Button type='primary' size={'large'} style={styles.loginBtn} onClick={() => this.loginClick()}>登陆</Button>
        </View>
      </ImageBackground>
    )
  }


  loginClick() {
    Toast.success('这是提示',1)
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
  userInput: {
    marginBottom:10,
    padding: 0,
    borderBottomWidth:1,
    borderBottomColor: 'white',
    
  },
  passworInput: {
    padding: 0,
    borderBottomColor: 'white',
    borderBottomWidth:1
  },
  loginBtn: {
    marginTop: 10
  }
});
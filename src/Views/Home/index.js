/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Platform, StyleSheet, Text, View,FlatList,Dimensions,TouchableOpacity} from 'react-native';
import NavigationBar from 'components/NavigationBar';
import {Button,Toast} from 'antd-mobile-rn';
import HomeCell from './HomeCell'
import DeviceStorage from 'lib/DeviceStorage';
import UserManage from 'lib/UserManage';
import { USER_ACTION } from 'reduxs/action/action';
import { requestVideoList } from 'src/Api';
import DefaultListView from 'views/DefaultListView/index';

class Home extends Component {

  constructor(props){
    super(props)
    this.state={
      data:[]
    }
  }

  componentWillMount() {
    const { user } = this.props.navigation.state.params;
    
    let param = {
       user:user.user,
       token:user.token,
       count:20,
       page:0,
    }
    console.log('param',param);
    Toast.loading('加载中...',0,(()=>{}),true)
    requestVideoList(param).then((res) => {
      console.log('res',res);
      if (res.code == '0') {
        this.setState({data:res.data.list})
      }else{
        Toast.show(res.message,1)
      }
      Toast.hide()
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title={'首页'}/>
        <FlatList
            horizontal={false}
            ListEmptyComponent={() => this.createEmptyView()}
            data={this.state.data}
            renderItem={({item,index}) => this.createCell(item,index)}
            keyExtractor={(item, index) => index.toString()}>
        </FlatList>
      </View>
    )
  }

  createEmptyView() {
    return(
        <DefaultListView />
    )
  }

  createCell(item,index) {
    return (
      <HomeCell cellClick={(item) => this.cellClick(item)} item={item}/>
    );
  }

  cellClick(item) {
    Toast.success(item.text,1)
    // this.props.navigation.navigate('Login');
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
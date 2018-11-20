/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Platform, StyleSheet, Text, View,FlatList,Dimensions,
        TouchableOpacity,RefreshControl} from 'react-native';
import NavigationBar from 'components/NavigationBar';
import {Toast} from 'antd-mobile-rn';
import HomeCell from './HomeCell'
import { requestVideoList } from 'src/Api';
import DefaultListView from 'views/DefaultListView/index';

export default class Home extends Component {

  constructor(props){
    super(props)
    this.state={
      data:[],
      refreshing: false,
      page:0,
    }
  }

  componentWillMount() {
    this.fetchDataList()
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
            keyExtractor={(item, index) => index.toString()}
            refreshControl={this.createRefreshControl()}
        />
      </View>
    )
  }

  // 上拉
  refreshAction() {
    let page = this.state.page;
    page += 1
    this.setState({page:page})
    
    this.fetchDataList()
  }

  fetchDataList() {
    const { user } = this.props.navigation.state.params;
    
    let param = {
       user:user.user,
       token:user.token,
       count:20,
       page:this.state.page,
    }
    if (!param) {
        return
    }
    Toast.loading('加载中...',0,(()=>{}),true)
    requestVideoList(param).then((res) => {
      if (res.code == '0') {
        this.setState({data:res.data.list})
      }else{
        Toast.show(res.message,1)
      }
      Toast.hide()
    })
  }

  createRefreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this.refreshAction}
        title="加载中..."/>
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
    Toast.success(item.videoId,1)
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
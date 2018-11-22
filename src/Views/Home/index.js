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
    setTimeout(() => {
      this.fetchDataList(0)
    }, 300);
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
            onEndReachedThreshold={0.1}//执行上啦的时候10%执行
            onEndReached={this.loreMore()}
        />
      </View>
    )
  }

  // 下拉刷新
  refreshAction() {
    this.setState({refreshing:true})
    this.fetchDataList(0)
  }

  // 上拉加载更多
  loreMore() {
    let page = this.state.page
    page += 1
    
  }

  fetchDataList(page) {
    
    const { user } = this.props.navigation.state.params;
    
    let param = {
       user:user.user,
       token:user.token,
       count:20,
       page:page,
    }
    if (!param) {
        return
    }
    Toast.loading('加载中...',0,(()=>{}),true)
    requestVideoList(param).then((res) => {
      if (res.code == '0') {
         let data = res.data.list
         if (data.length > 0) {
            let list = this.state.data;
            console.log(page,list);
            if (page == 0) {
                list = data
            }else{
                list.concat(data)
            }
            this.setState({data:list,page:page})
         }
      }else{
        Toast.show(res.message,1)
      }
      this.setState({refreshing:false})
      Toast.hide()
    })
  }

  createRefreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={() => this.refreshAction()}
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
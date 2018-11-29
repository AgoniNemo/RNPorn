/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Platform, StyleSheet, View} from 'react-native';
import NavigationBar from 'components/NavigationBar';
import {Toast} from 'antd-mobile-rn';
import HomeCell from './HomeCell'
import { VideoListAction } from 'src/utils/HttpHandler';
import FlatList from 'components/TableList';

export default class Home extends Component {

  constructor(props){
    super(props)
    this.state={
      data:[],
      refreshing: false,
      page:0,
      user:null,
    }
  }

  componentWillMount() {
    const { user } = this.props.navigation.state.params;
    this.setState({user:user})
    setTimeout(() => {
      this.fetchDataList(0)
    }, 300);
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title={'首页'}/>
        <FlatList
            data={this.state.data}
            refreshing={this.state.refreshing}
            renderRow={(item,index) => this.createCell(item,index)}
            onEndReached={() => this.loreMore()}
            onRefresh={() => this.refreshAction()}
        />
      </View>
    )
  }

  // 下拉刷新
  refreshAction() {
    this.fetchDataList(0)
  }

  // 上拉加载更多
  loreMore() {
    let page = this.state.page
    page += 1
    this.fetchDataList(page)
  }

  fetchDataList(page) {
    this.setState({refreshing:true})
    
    let param = {
       count:20,
       page:page,
    }
    Toast.loading('加载中...',0,(()=>{}),true)
    VideoListAction(param,{
      Callback:(res) => {
        if (res.code == '0') {
           let data = res.data.list
           if (data.length > 0) {
              let list = this.state.data;
              if (page == 0) {
                  list = data
              }else{
                  list = list.concat(data)
              }            
              this.setState({data:list,page:page,refreshing:false})
           }
        }else{
          Toast.show(res.message,1)
        }
        this.setState({refreshing:false})
        Toast.hide()
      },
      err:(err) =>{
        Toast.hide()
        Toast.show('网络出错！',1)
      }
    })
  }

  createCell({item,index}) {
    return (
      <HomeCell cellClick={(item) => this.cellAction(item)} item={item} isShow={this.state.user !== '1000'}/>
    );
  }

  cellAction(item) {
    // Toast.success(item.videoId,1)
    this.props.navigation.navigate('VideoDetails',{
        transition: 'forHorizontalRight',
        item:item,
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});
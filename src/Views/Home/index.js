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
import { VideoListAction,CollectVideoListAction } from 'src/utils/HttpHandler';
import FlatList from 'components/TableList';
import DBManager from 'lib/DBManager';
import PageManage from 'lib/PageManage';

export default class Home extends Component {

  constructor(props){
    super(props)
    this.state={
      data:[],
      refreshing: false,
      page:0,
      initial:0,
      user:null,
    }
  }

  componentWillMount() {
    const { user } = this.props.navigation.state.params;
    this.setState({user:user})
    const than = this;
    PageManage.get().then(page => {
        let res = {
          page:8,
          total:22,
          ...page
        }
        than.setState({page:res.page,initial:res.page});
        than.fetchDataList(res.page)
        res.page = res.page + 1;
        if (res.page > res.total) {
          res.page = 8;
        }
        PageManage.save(res);
    });
    this.collectVideoSave();
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
    this.fetchDataList(this.state.initial)
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
              if (page == this.state.initial) {
                  list = data
              }else{
                  list = list.concat(data)
              }            
              this.setState({data:list,page:page,refreshing:false})
           }
           PageManage.get().then(pg => {
              if (pg.total != res.data.total) {
                  pg.total = res.data.total;
                  PageManage.save(pg);
              }
           });
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
      <HomeCell cellClick={(item) => this.cellAction(item)} item={item} isShow={this.state.user.authority !== '1000'}/>
    );
  }

  cellAction(item) {
    // Toast.success(item.videoId,1)
    this.props.navigation.navigate('VideoDetails',{
        item:item,
        isShow:(this.state.user.authority !== '1000'),
        transition:'forHorizontalRight',
    });
  }

  collectVideoSave() {
    CollectVideoListAction({
      Callback:(res) => {
        if (res.code == '0') {
           let data = res.data
           if (data.length > 0) {
              DBManager.delAllCollectData();
              DBManager.addMoreCollect(data,((result) => {
                console.log('保存结果:', result);
              }))
           }
        }else{
          console.log('出错！',res.message);
        }
      },
      err:(err) =>{
        console.log('网络出错！');
      }
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});
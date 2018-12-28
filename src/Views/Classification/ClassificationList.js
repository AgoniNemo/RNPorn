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
import HomeCell from 'views/Home/HomeCell'
import { CategoriesListAction } from 'src/utils/HttpHandler';
import FlatList from 'components/TableList';

export default class ClassificationList extends Component {

  static navigationOptions=((props)=>{
      return {
        title:`${props.navigation.state.params.item.title}分类`
      }
  });

  constructor(props){
    super(props)
    this.state={
      data:[],
      refreshing: false,
      page:0,
      user:null,
      isShow:false,
    }
  }

  componentWillMount() {
    const { isShow } = this.props.navigation.state.params;
    this.setState({
        isShow:isShow,
    })
    setTimeout(() => {
      this.fetchDataList(0)
    }, 300);
  }

  render() {
    return (
      <View style={styles.container}>
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
       categories:'null'
    }

    Toast.loading('加载中...',0,(()=>{}),true)
    CategoriesListAction(param,{
      Callback:(res) => {
        if (res.code == '0') {
           let data = res.data
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
    console.log('createCell');
    return (
      <HomeCell cellClick={(item) => this.cellAction(item)} item={item} isShow={this.state.isShow}/>
    );
  }

  cellAction(item) {
    this.props.navigation.navigate('VideoDetails',{
        item:item,
        isShow:this.state.isShow
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
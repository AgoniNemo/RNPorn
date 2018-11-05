/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList,Dimensions,TouchableOpacity} from 'react-native';
import NavigationBar from 'components/NavigationBar';
import {Button,Toast} from 'antd-mobile-rn';
import HomeCell from './HomeCell'

let {height, width} = Dimensions.get('window');

export default class Home extends Component {

  constructor(props){
    super(props)
    this.state={
      data:[]
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title={'首页'}/>
        <FlatList
            horizontal={false}
            data={this.state.data}
            renderItem={({item,index}) => this.createCell(item,index)}
            keyExtractor={(item, index) => index.toString()}>
        </FlatList>
      </View>
    )
  }

  componentDidMount() {
    Toast.loading('加载中...',0,(()=>{}),true)
    setTimeout(() => {
      this.setState({
        data: [
          {vc:'Animations',text:'Animations界面',key:0},
          {vc:'Animation',text:'Animation界面',key:1},
          {vc:'Video',text:'Video界面',key:2}
        ]
      })
      Toast.hide()
    }, 800);
    
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
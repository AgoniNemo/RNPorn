import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList} from 'react-native';
import {Toast} from 'antd-mobile-rn';

export default class Setting extends Component {

  constructor(props){
    super(props)
    this.state={
      data:[]
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{'设置'}</Text>
        
      </View>
    )
  }

  componentDidMount() {
      this.setState({
        data: [
          {vc:'Animations',text:'我的收藏',key:0},
          {vc:'Animation',text:'观看历史',key:1},
          {vc:'Video',text:'个人信息',key:2}
        ]
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
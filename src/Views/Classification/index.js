import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList} from 'react-native';
import NavigationBar from 'components/NavigationBar';
import {Button,Toast} from 'antd-mobile-rn';
import ClassificationCell from './ClassificationCell'
import { SCREEN } from 'components/Public';

export default class Classification extends Component {

  constructor(props){
    super(props)
    this.state={
      data:[]
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title={'分类'}/>
        <FlatList
            style={{width:SCREEN.width,marginBottom:10}}
            horizontal={false}
            numColumns={2}
            data={this.state.data}
            renderItem={({item,index}) => this.createCell(item,index)}
            keyExtractor={(item, index) => index.toString()}>
        </FlatList>
      </View>
    )
  }

  componentDidMount() {
    Toast.loading('加载中...',0,(()=>{}),true)
    let list = []
    for (let index = 0; index < 10; index++) {
      let obj = {vc:'Animations',text:'Animations界面',key:index}
      list.push(obj)
    }
    setTimeout(() => {
      this.setState({
        data: list
      })
      Toast.hide()
    }, 800);
    
  }

  createCell(item,index) {
    return (
      <ClassificationCell cellClick={(item) => this.cellClick(item)} item={item}/>
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
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  }
});
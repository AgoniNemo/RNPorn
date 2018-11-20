import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList,Dimensions} from 'react-native';
import NavigationBar from 'components/NavigationBar';
import {Toast} from 'antd-mobile-rn';
import MineCell from './MineCell';
import MineHeader from './MineHeader';

export default class Mine extends Component {

  constructor(props){
    super(props)
    this.state={
      data:[
        {text:'我的收藏',key:0},
        {text:'观看历史',key:1},
        {text:'个人信息',key:2}
      ]
    }
  }

  render() {
    const { user } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <NavigationBar title={'我的'} 
          rightIcon={require('assets/image/i_menu.png')}
          rightClick={this.settingClick.bind(this)}/>
        <FlatList
            ListHeaderComponent={({item,index}) => this.createHearder(item,index,user.headPath)}
            horizontal={false}
            data={this.state.data}
            renderItem={({item,index}) => this.createCell(item,index)}
            keyExtractor={(item, index) => index.toString()}>
        </FlatList>
      </View>
    )
  }

  componentDidMount() {
  
  }

  createCell(item,index) {
    return (
      <MineCell cellClick={(item) => this.cellClick(item)} item={item}/>
    );
  }

  cellClick(item) {
    Toast.success(item.text,1)
    // this.props.navigation.navigate('Login');
  }

  createHearder(item,index,headPath) {
    return(
      <MineHeader icon={headPath}/>
    )
  }

  settingClick() {
    this.props.navigation.navigate('Setting');
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});

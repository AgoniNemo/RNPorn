import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList} from 'react-native';
import NavigationBar from 'components/NavigationBar';
import {Modal,Toast} from 'antd-mobile-rn';
import CardCell from './CardCell'
import { SCREEN,Color } from 'components/Public';
import DBManager from 'lib/DBManager';

export default class History extends Component {

  constructor(props){
    super(props)
    this.state={
      data:[],
      user:null,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
            style={{width:SCREEN.width,marginBottom:10}}
            horizontal={false}
            data={this.state.data}
            renderItem={({item,index}) => this.createCell(item,index)}
            keyExtractor={(item, index) => index.toString()}>
        </FlatList>
      </View>
    )
  }

  componentDidMount() {
    const { user } = this.props.navigation.state.params;
    DBManager.getHistoryData((list) => {
        this.setState({
          data: [...list],
          user: user,
        })
    })
  }

  createCell(item,index) {
    return (
      <CardCell 
      cellClick={(item) => this.cellClick(item)}
      btnCall={(item) => this.btnAction(item,index)}
      item={item} isCollect={false} 
      isShow={this.state.user.authority !== '1000'}/>
    );
  }

  cellClick(item) {
    this.props.navigation.navigate('VideoDetails',{
      item:item,
      isShow:(this.state.user.authority !== '1000'),
    });
  }

  btnAction(item,index) {
    const alertInstance = Modal.alert('提示', '是否删除历史', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确定', onPress: () => {
          this.certainAction(item,index)
      }},
    ]);
  }

  certainAction(item,index) {
    DBManager.delHistoryData(item.videoId,(res) => {
        if (res) {
          let list = this.state.data;
          list.splice(index,1);
          this.setState({
            data: [...list],
          })
        }
    })
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: Color.sectionBackgroundColor,
  }
});
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList} from 'react-native';
import NavigationBar from 'components/NavigationBar';
import {Modal,Toast} from 'antd-mobile-rn';
import CardCell from './CardCell'
import { SCREEN,Color } from 'components/Public';

export default class Collect extends Component {

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
    this.setState({
      data: [{
        category: "null",
        duration: "19:34",
        hls: false,
        icon: "http://www.zz1257.com/media/videos/tmb/000/047/206/1.jpg",
        playPath: "http://video2.zz1240.com/47206.mp4",
        rating: "100",
        symbol: "103",
        title: "裸条门视频1",
        videoId: "ac8a77e3da4c7afb2a61bdf505f2bb50",
        views: "81558"},
        {
          category: "null",
          duration: "19:34",
          hls: false,
          icon: "http://www.zz1257.com/media/videos/tmb/000/047/206/1.jpg",
          playPath: "http://video2.zz1240.com/47206.mp4",
          rating: "100",
          symbol: "103",
          title: "裸条门视频1这里文字很多我朝右很为不是温江是是是是是 是是是是是是是昌是",
          videoId: "ac8a77e3da4c7afb2a61bdf505f2bb50",
          views: "81558"}],
      user: user,
    })
  }

  createCell(item,index) {
    return (
      <CardCell 
      cellClick={(item) => this.cellClick(item)}
      btnCall={(item) => this.btnAction(item)}
      item={item} isCollect={true} 
      isShow={this.state.user.authority !== '1000'}/>
    );
  }

  cellClick(item) {
    this.props.navigation.navigate('VideoDetails',{
      transition: 'forHorizontalRight',
      item:item,
      isShow:(this.state.user.authority !== '1000'),
    });
  }

  btnAction(item) {
    const alertInstance = Modal.alert('提示', '是否取消收藏', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确定', onPress: () => {
          this.cancelAction(item)
      }},
    ]);
  }

  cancelAction(item) {
    console.log(item);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: Color.sectionBackgroundColor,
  }
});
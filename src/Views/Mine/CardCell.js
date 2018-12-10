import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,TouchableOpacity} from 'react-native';
import { SCREEN } from 'components/Public';

export default class CardCell extends Component {

  constructor(props){
    super(props)
    this.state={
      data:[],
    }
  }

  render() {
    let model = this.props.item;
    return (
        <TouchableOpacity
        activeOpacity = {0.5}
        onPress={() => this.click(this.props.item)}>
            <View style={styles.container}>
                <Image style={styles.imageStyle} source={this.props.isShow ? {uri:model.icon}: require('assets/image/header.jpg')} roundAsCircle={true}/>
                <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{this.props.isShow?model.title:'这是文字信息'}</Text>
                    <View style={styles.bottomContainer}>
                      <View style={styles.viewsAndTime}>
                        <Text style={styles.text}>{`时间:${model.duration}  `}</Text>
                        <Text style={styles.text}>{`  次数:${model.views}`}</Text>
                      </View>
                      <TouchableOpacity
                        activeOpacity = {0.8}
                        onPress={() => this.btnAction(this.props.item)}>
                            <Text style={styles.text}>{this.props.isCollect?'取消收藏':'删除'}</Text>
                      </TouchableOpacity>
                    </View>
                </View>
            </View>
      </TouchableOpacity>
    )
  }

  click(item) {
    if (this.props.cellClick) {
        this.props.cellClick(item)
    }
  }

  btnAction(item) {
    if (this.props.btnCall) {
        this.props.btnCall(item)
    }
  }

}
let interval = 10;
let imageWidth = SCREEN.width*360/1080;
let imageHeight = imageWidth*212/350;

const styles = StyleSheet.create({

  container: {
    flex:1,
    flexDirection: 'row',
    marginTop:interval,
    marginLeft:interval,
    marginRight:interval,
  },
  imageStyle:{
    width: imageWidth,
    height: imageHeight,
    borderRadius:3,
  },
  textContainer: {
    flex:1,
    marginLeft:5,
  },
  bottomContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  viewsAndTime: {
    flexDirection: 'row',
  },
  title: {
    color:'black',
    height:40,
    marginBottom:10,
  },
  text: {
    color:'black',
    fontSize:12,
    height:20,
    lineHeight:20,
  },
});
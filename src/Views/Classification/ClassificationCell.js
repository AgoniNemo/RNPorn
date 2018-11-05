import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,TouchableOpacity} from 'react-native';
import { SCREEN,Color } from 'components/Public';

export default class ClassificationCell extends Component {

  constructor(props){
    super(props)
    this.state={
      data:[]
    }
  }

  render() {
    return (
        <TouchableOpacity
        activeOpacity = {0.5}
        onPress={() => this.click(this.props.item)}>
            <View style={styles.container}>
                <Image style={styles.imageStyle} source={require('assets/image/header.jpg')} roundAsCircle={true}/>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{'这是文字信息'}</Text>
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

}
let interval = 10;
let cellWidth = (SCREEN.width-3*interval)/2;
let cellHeight = cellWidth*43/35;

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#fff',
    width: cellWidth,
    height:cellHeight,
    marginTop:interval,
    marginLeft:interval,
  },
  imageStyle:{
    width: cellWidth,
    height: cellHeight,
    borderRadius:3,
  },
  textContainer: {
    position:'absolute',
    backgroundColor:Color.translucent,
    bottom:0,
    width:cellWidth,
    height:20,
  },
  text: {
    color:'white',
    fontSize:12,
    textAlign:'center',
    height:20,
    lineHeight:20,
  },
});
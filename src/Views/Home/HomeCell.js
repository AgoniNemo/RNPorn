
import React, {Component} from 'react';
import {Platform, StyleSheet, Text,Dimensions,TouchableOpacity,View,Image} from 'react-native';
import { SCREEN } from 'components/Public';

export default class HomeCell extends Component {

  render() {
    return (
        <TouchableOpacity
        activeOpacity = {0.5}
        onPress={() => this.click(this.props.item)}
          >
          <View style={styles.cell}>
            <View style={styles.header}>
                <Image roundAsCircle={true} style={styles.imageStyle} source={require('assets/image/header.jpg')}/>
                <View style={styles.timeContainer}>
                    <Text style={styles.time}>{`这是一个时间`}</Text>
                </View>
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>{`这是一个比分`}</Text>
                </View>
            </View>
            <Text style={styles.title}>{`这是一个标题`}</Text>
          </View>
        </TouchableOpacity>
      );
  }

  click(item) {
    if (this.props.cellClick) {
        this.props.cellClick(item)
    }
  }

}
const styles = StyleSheet.create({
    cell: {
      width: SCREEN.width,
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderBottomColor: '#eee',
      alignItems:'flex-start',
      justifyContent: 'center'
    },
    header: {
        marginTop:10,
        marginLeft:20,
    },
    imageStyle:{
        width: SCREEN.width-2*20,
        height: (SCREEN.width-2*20)/16*9,
        borderRadius:3,
    },
    timeContainer: {
        position:'absolute',
        backgroundColor:'rgba(0,0,0,0.7)',
        padding:2,
        borderRadius:1,
        left: 5,
        bottom:5,
    },
    ratingContainer: {
        position:'absolute',
        backgroundColor:'rgba(0,0,0,0.7)',
        padding:2,
        borderRadius:1,
        bottom:5,
        right:5,
    },
    time: {
        fontSize:12,
        color:'white',
    },
    rating: {
        fontSize:12,
        color:'white',
    },
    title: {
        color:'red',
        marginLeft:20,
        marginBottom:10,
        paddingLeft:5,
        paddingRight:5,
    }
  });
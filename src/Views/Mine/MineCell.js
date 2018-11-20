import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,TouchableOpacity} from 'react-native';
import { SCREEN } from 'components/Public';

export default class MineCell extends Component {

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
                <Text style={styles.text}>{this.props.item.text}</Text>
                <Image style={styles.image} 
                source={require('assets/image/i_right.png')} 
                roundAsCircle={true}/>
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

  const styles = StyleSheet.create({
  
    container: {
      backgroundColor: '#fff',
      width: SCREEN.width,
      height:44,
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderBottomColor: '#eee',
    },
    text: {
        fontSize:17,
        height:44,
        lineHeight:44,
        marginLeft:20,
    },
    image: {
        position:'absolute',
        right:10,
        top:11,
        width:20,
        height:20,
    }
  });
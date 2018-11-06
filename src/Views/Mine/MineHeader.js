import React, {Component} from 'react';
import {Platform, StyleSheet,Image,TouchableOpacity,findNodeHandle} from 'react-native';
import { SCREEN } from 'components/Public';
import { BlurView, VibrancyView } from 'react-native-blur';

export default class MineHeader extends Component {

    constructor(props){
      super(props)
      this.state={
        data:[],
        viewRef: findNodeHandle(require('assets/image/header.jpg')),
        backgroundImage:null,
      }
    }
  
    imageLoaded() {
      this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }

    render() {
      return (
          <TouchableOpacity
          activeOpacity = {1}
          onPress={() => this.click(this.props.item)}>
            <Image style={styles.container}
              ref={(img) => { this.backgroundImage = img; }}
              source={require('assets/image/header.jpg')}
              onLoadEnd={this.imageLoaded.bind(this)}
              resizeMode='cover'>
            </Image>
            <BlurView
              style={styles.absolute}
              viewRef={this.state.viewRef}
              blurType="light"
              blurAmount={10}/>
            <Image style={styles.image} source={require('assets/image/header.jpg')} roundAsCircle={true}/>
        </TouchableOpacity>
      )
    }
  
    click(item) {
      if (this.props.headerClick) {
          this.props.headerClick(item)
      }
    }
  
  }

  const styles = StyleSheet.create({
  
    container: {
      backgroundColor: '#fff',
      width: SCREEN.width,
      height:SCREEN.width,
    },
    absolute: {
      position: "absolute",
      top: 0, left: 0, bottom: 0, right: 0,
    },
    image: {
        position: "absolute",
        width:SCREEN.width/2,
        height:SCREEN.width/2,
        borderRadius:SCREEN.width/4,
        top:SCREEN.width/4,
        left:SCREEN.width/4,
    },
  });
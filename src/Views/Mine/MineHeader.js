import React, {Component} from 'react';
import {Platform, StyleSheet,Image,TouchableOpacity,findNodeHandle,View} from 'react-native';
import { SCREEN } from 'components/Public';

// require('assets/image/header.jpg')
export default class MineHeader extends Component {

    constructor(props){
      super(props)
      this.state={
        data:[],
        icon:null,
        backgroundImage:null,
      }
    }
  
    imageOnError() {
      this.setState({ icon: require('assets/image/header.jpg') });
    }


    componentWillMount() {
      this.setState({ icon: (this.props.icon.length == 0)?require('assets/image/header.jpg'):{uri:this.props.icon} });
    }

    render() {      
      return (
          <TouchableOpacity
          activeOpacity = {1}
          onPress={() => this.click(this.props.item)}>
            <Image style={styles.container}
              source={this.state.icon}
              onError={this.imageOnError.bind(this)}
              blurRadius={5}
              resizeMode='cover'/>
            <View style={styles.absolute}></View>
            <Image style={styles.image} source={this.state.icon} 
            onError={this.imageOnError.bind(this)}
            roundAsCircle={true}/>
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
      backgroundColor:'rgba(0,0,0,0.4)',
    },
    image: {
        position: "absolute",
        borderWidth: 2 ,
        borderColor:'#fff',
        width:SCREEN.width/2,
        height:SCREEN.width/2,
        borderRadius:SCREEN.width/4,
        top:SCREEN.width/4,
        left:SCREEN.width/4,
    },
  });
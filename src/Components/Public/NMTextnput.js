import React, {Component} from 'react'
import {Platform, StyleSheet, View,TextInput,Image} from 'react-native'

export default class NMTextnput extends Component {

    render() {
      return (
        <View style={styles.container}>
            <Image source={require('assets/image/user.png')} style={styles.image}/>
            <TextInput style={styles.textInput}  placeholder={this.props.placeholder} placeholderTextColor={'white'}/>
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    container: {
        marginBottom:10,
        padding: 0,
        borderBottomWidth:1,
        borderBottomColor: 'white',
        flexDirection: 'row',
    },
    image: {
        width:41/2,
        height:29/2,
        top:15,
        marginRight:10
    },
    textInput: {
        color:'white',
        fontSize:17,
        flex:1
    },
  });
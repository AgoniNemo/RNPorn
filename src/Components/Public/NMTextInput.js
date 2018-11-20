import React, {Component} from 'react'
import {Platform, StyleSheet, View,TextInput,Image} from 'react-native'

export default class NMTextInput extends Component {

    render() {
      return (
        <View style={styles.container}>
            <Image source={this.props.source } style={styles.image}/>
            <TextInput style={styles.textInput}  placeholder={this.props.placeholder}  defaultValue={(this.props.defaultValue ? this.props.defaultValue : '')} placeholderTextColor={'white'} onChangeText={(value)=> this.inputAction(value)} secureTextEntry={this.props.secureTextEntry}/>
        </View>
      )
    }

    inputAction(value) {
        if (this.props.callBackFunc) {
            this.props.callBackFunc(value)
        }
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
        top:18,
        marginRight:10
    },
    textInput: {
        color:'white',
        fontSize:17,
        flex:1
    },
  });
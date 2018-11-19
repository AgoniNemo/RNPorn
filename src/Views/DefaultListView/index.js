import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ImageBackground,Dimensions,Image} from 'react-native';


export default class DefaultListView extends Component{ 
    render() {
        return (
          <View style={styles.container}>
            <Text>{'暂时没有数据'}</Text>
          </View>
        )
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent:'center',
      backgroundColor: '#fff',
    }
  });
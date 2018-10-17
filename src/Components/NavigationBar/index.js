import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,Dimensions} from 'react-native';
import {BoxShadow} from 'react-native-shadow'

let {height, width} = Dimensions.get('window');

export default class NavigationBar extends Component {

    render() {
        const shadowOpt = {
            width:width,
            height:44,
            color:"#000",
            border:2,
            opacity:0.2,
            x:0,
            y:1,// 阴影height
            style: { marginBottom: 5 }
        }

        return (
            <BoxShadow setting={shadowOpt}>
                <View style={styles.container}>
                    <Text>{this.props.title}</Text>
                </View>
            </BoxShadow>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      width: width,
      height: 44,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      shadowOffset: {width: 0, height: 5},
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowColor: 'red',
    }
});
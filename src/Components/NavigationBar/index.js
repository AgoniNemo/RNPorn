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
            border:1,
            opacity:0.2,
            x:0,
            y:1,// 阴影height
            style: {
                marginBottom: 3,
                ...Platform.select({
                    ios: {
                      marginTop: 20
                    }
                }),
            }
        }

        return (
            <BoxShadow setting={shadowOpt}>
                <View style={styles.container}>
                    <Text style={styles.title}>{this.props.title}</Text>
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
      backgroundColor: '#fff',
    },
    title: {
        height: 44,
        lineHeight:44,
    }
});
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,Dimensions,TouchableOpacity} from 'react-native';
import {BoxShadow} from 'react-native-shadow'
import { SCREEN } from 'components/Public';

export default class NavigationBar extends Component {

    render() {
        const shadowOpt = {
            width:SCREEN.width,
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
                    {this.props.rightIcon  ? 
                        <TouchableOpacity
                        style={styles.imageContainer}
                        activeOpacity = {0.5}
                        onPress={() => this.click()}>
                            <Image style={{width:23,height:23}} source={this.props.rightIcon}/>
                    </TouchableOpacity> : null}
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
            </BoxShadow>
        )
    }

    click() {
        if (this.props.rightClick) {
            this.props.rightClick()
        }
    }
}

const styles = StyleSheet.create({
    container: {
      width: SCREEN.width,
      height: 44,
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    title: {
        height: 44,
        lineHeight:44,
    },
    imageContainer: {
        position:'absolute',
        right:10,
        top:10.5,
    }
});
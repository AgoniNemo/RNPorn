import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,
    Image,Dimensions,TouchableOpacity,StatusBar} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import { SCREEN,Color } from 'components/Public';

export default class NavigationBar extends Component {

    constructor(props) {
        super(props)
        this.state={
            navWidth:SCREEN.width,
        }
    }

    render() {
        const shadowOpt = {
            width:this.state.navWidth,
            height:64,
            color:"#000",
            border:1,
            opacity:0.3,
            x:0,
            y:1,// 阴影height
            style: {
                marginBottom: 3,
                ...Platform.select({
                    ios: {
                      marginTop: 0
                    }
                }),
            }
        }

        return (
            <BoxShadow setting={shadowOpt}>
                <View style={styles.container} >
                    {this.props.leftIcon  ? 
                        <TouchableOpacity
                        style={styles.leftImageContainer}
                        activeOpacity = {0.5}
                        onPress={() => this.lClick()}>
                            <Image style={{width:23,height:23}} source={this.props.leftIcon}/>
                    </TouchableOpacity> : null}
                    <Text style={styles.title}>{this.props.title}</Text>
                    {this.props.rightIcon  ? 
                        <TouchableOpacity
                        style={styles.rightImageContainer}
                        activeOpacity = {0.5}
                        onPress={() => this.rClick()}>
                            <Image style={{width:23,height:23}} source={this.props.rightIcon}/>
                    </TouchableOpacity> : null}
                </View>
            </BoxShadow>
        )
    }

    rClick() {
        if (this.props.rightClick) {
            this.props.rightClick()
        }
    }
    lClick() {
        if (this.props.leftClick) {
            this.props.leftClick()
        }
    }
}
let top = (44-23)/2 + 20;
const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: Color.themeColor,
    },
    title: {
        marginTop: 20,
        height: 44,
        lineHeight:44,
        fontSize:17,
        color:'#fff',
    },
    leftImageContainer: {
        position:'absolute',
        left:10,
        top:top,
    },
    rightImageContainer: {
        position:'absolute',
        right:10,
        top:top,
    }
});
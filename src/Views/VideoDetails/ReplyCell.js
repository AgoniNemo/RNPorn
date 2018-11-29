
import React, {Component} from 'react';
import {Platform, StyleSheet, Text,Dimensions,TouchableOpacity,View,Image} from 'react-native';
import { SCREEN } from 'components/Public';
import { parseTime } from 'utils/DataFormat'

export default class HomeCell extends Component {

  constructor(props){
      super(props)
      this.state={
         url:'',
      }
  }

  render() {
    const item =  this.props.item
    return (
          <View style={styles.cell}>
            <View style={styles.headerContainer}>
                <Text style={styles.nameStyle}>{item.name}</Text>
                <Image roundAsCircle={true} style={styles.imageStyle} source={this.state.url}
              onError={this.imageOnError.bind(this)}/>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.timeStyle}>{parseTime(item.time)}</Text>
                <Text style={styles.content}>{item.content}</Text>
            </View>
          </View>
      );
  }

  click(item) {
    if (this.props.cellClick) {
        this.props.cellClick(item)
    }
  }

  imageOnError() {
    this.setState({ url: require('assets/image/header.jpg') });
  }


  componentWillMount() {
    this.setState({ url: {uri:this.props.item.headPath} });
  }

}
const styles = StyleSheet.create({
    cell: {
      flexDirection: 'row',
      alignItems:'flex-start',
      justifyContent:'space-between',
      width: SCREEN.width,
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderBottomColor: '#eee',
    },
    headerContainer: {
        alignItems:'center',
        margin:10,
    },
    imageStyle:{
        width: 50,
        height: 50,
        borderRadius:3,
    },
    nameStyle: {
        fontSize:12,
        marginBottom:2,
        fontWeight:'bold',
    },
    contentContainer: {
        flex:1,
        marginTop:10,
        marginRight:10,
    },
    content: {
        fontSize:14,
    },
    timeStyle: {
        textAlign:'right',
        fontSize:12,
        marginBottom:2,
    },
  });
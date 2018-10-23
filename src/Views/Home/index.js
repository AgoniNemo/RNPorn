/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList,Dimensions,TouchableOpacity,ToastAndroid} from 'react-native';
import NavigationBar from 'components/NavigationBar';

let {height, width} = Dimensions.get('window');

export default class Home extends Component {

  constructor(props){
    super(props)
    this.state={
      data:[]
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title={'首页'}/>
        <FlatList
            horizontal={false}
            data={this.state.data}
            renderItem={({item,index}) => this.createCell(item,index)}
            keyExtractor={(item, index) => index.toString()}>
        </FlatList>
      </View>
    )
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: [
          {vc:'Animations',text:'Animations界面',key:0},
          {vc:'Animation',text:'Animation界面',key:1},
          {vc:'Video',text:'Video界面',key:2}
        ]
      })
    }, 200);

  }

  createCell(item,index) {
    return (
      <TouchableOpacity
      activeOpacity = {0.5}
      onPress={() => this.cellClick(item,index)}
        >
        <View style={styles.cell}>
          <Text style={styles.text}>{`第${index}行`}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  cellClick(item,index) {
    this.props.navigation.navigate('Login');
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cell: {
    width: width,
    height: 44,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#eee',
    alignItems:'center',
    justifyContent: 'center'
  },
  image: {
    height:100,
    width: 100,
  }
});
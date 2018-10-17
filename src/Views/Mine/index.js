import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList,Dimensions} from 'react-native';
import NavigationBar from 'components/NavigationBar';

let {height, width} = Dimensions.get('window');

export default class Mine extends Component {

  constructor(props){
    super(props)
    this.state={
      data:[]
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title={'我的'}/>
        <Text>{'Mine页面'}</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});
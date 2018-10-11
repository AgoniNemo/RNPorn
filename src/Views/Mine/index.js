import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList,Dimensions} from 'react-native';

let {height, width} = Dimensions.get('window');


type Props = {};
export default class Mine extends Component<Props> {

  static navigationOptions = {
    title: 'Mine页面',
  };
  constructor(props){
    super(props)
    this.state={
      data:[]
    }
  }

  render() {
    return (
      <View style={styles.container}>
       <Text>{'Mine页面'}</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});
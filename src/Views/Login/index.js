import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList,Dimensions,TouchableOpacity,ToastAndroid} from 'react-native';

let {height, width} = Dimensions.get('window');


type Props = {};
export default class Login extends Component<Props> {

  static navigationOptions = {
    headerTitle: 'Login页面',
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
       <Text>{'Login页面'}</Text>
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
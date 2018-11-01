import React, {Component} from 'react';
import {StyleSheet,View} from 'react-native';


export default class NMView extends Component {

  render() {
    return (
        <View style={styles.container} {...props}></View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  }
});
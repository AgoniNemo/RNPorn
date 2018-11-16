import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList} from 'react-native';
import NavigationBar from 'components/NavigationBar';
import {Button,Toast} from 'antd-mobile-rn';
import ClassificationCell from './ClassificationCell'
import { SCREEN } from 'components/Public';
import { categories } from 'utils/staticData';

export default class Classification extends Component {

  constructor(props){
    super(props)
    this.state={
      data:[]
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title={'分类'}/>
        <FlatList
            style={{width:SCREEN.width,marginBottom:10}}
            horizontal={false}
            numColumns={2}
            data={this.state.data}
            renderItem={({item,index}) => this.createCell(item,index)}
            keyExtractor={(item, index) => index.toString()}>
        </FlatList>
      </View>
    )
  }

  componentDidMount() {
    const list = categories;
    this.setState({
      data: list
    })
  }

  createCell(item,index) {
    return (
      <ClassificationCell cellClick={(item) => this.cellClick(item)} item={item}/>
    );
  }

  cellClick(item) {
    Toast.success(item.title,1)
    // this.props.navigation.navigate('Login');
    this.props.navigation.navigate('Setting');
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  }
});
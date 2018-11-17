import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,SectionList,TouchableOpacity} from 'react-native';
import {Toast} from 'antd-mobile-rn';
import { SCREEN , Color} from 'components/Public';

export default class Setting extends Component {

  constructor(props){
    super(props)
    this.state={
      data:[]
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          renderItem={({ item, index, section }) => this.createCell({ item, index, section })}
          sections={this.state.data}
          SectionSeparatorComponent={(item, index, section) => this.createSectionSep(item, index, section)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }

  componentDidMount() {
      this.setState({
        data: [
            { index: 0, data: ['帮助', '关于']},
            { index: 1, data: ['退出登录'] },
        ]
      })    
  }

  createCell({ item, index, section }) {
      return(
        <TouchableOpacity
          activeOpacity = {0.5}
          onPress={() => this.cellClick(item, index, section)}>
          <View style={styles.textContainer}>
              <Text key={index} style={[styles.text,(section.index > 0 ? styles.logOut: null)]}>{item}</Text>
          </View>
        </TouchableOpacity>
      )
  }

  createSectionSep(item, index, section) {
    return(
      <View style={styles.sectionSep}></View>
    )
  }

  cellClick(item, index, section) {
    console.log(section,item,index);
    if (index == 0 && section.index == 1) {
      this.props.navigation.navigate('Login');
    }
    
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.sectionBackgroundColor,
  },
  textContainer: {
    width:SCREEN.width,
    backgroundColor:'#fff',
    height:44,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#eee',
  },
  text: {
    lineHeight:44,
    height:44,
    marginLeft:10,
    fontSize:17,
  },
  logOut: {
    textAlign:'center',
    color:Color.themeColor,
  },
  sectionSep: {
    height:20,
  },
});
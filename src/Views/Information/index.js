import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,SectionList,TouchableOpacity} from 'react-native';
import {Toast,Modal} from 'antd-mobile-rn';
import { SCREEN , Color} from 'components/Public';
import UserManage from 'lib/UserManage';

export default class Information extends Component {

  constructor(props){
    super(props)
    this.state={
      data:[],
      icon:null,
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

  componentWillMount() {
    UserManage.get().then(usr => {
        this.setState({ icon: (usr.headPath.length == 0)? require('assets/image/header.jpg') : {uri:usr.headPath},
        data: [
            { index: 0, data: [{title:'头像'}]},
            { index: 1, data: [
                {title:'昵称',end:usr.name},
                {title:'性别',end:usr.sex},
                {title:'年龄',end:usr.age},
                {title:'手机号',end:usr.phoneNumber},
                {title:'修改密码'}] },
        ] });
    });
    
  }

  imageOnError() {
    this.setState({ icon: require('assets/image/header.jpg') });
  }

  createCell({ item, index, section }) {
      return(
        <TouchableOpacity
          activeOpacity = {0.5}
          onPress={() => this.cellClick(item, index, section)}>
          <View style={styles.textContainer}>
              <Text key={index} style={styles.text}>{item.title}</Text>
              {
                  section.index == 0 ? 
                  <Image style={styles.endImage} 
                  onError={this.imageOnError.bind(this)}
                  source={this.state.icon}
                  roundAsCircle={true}/> : <Text style={styles.endText}>{item.end}</Text>
              }
              <Image style={styles.image} 
                source={require('assets/image/i_right.png')} 
                roundAsCircle={true}/>
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
    console.log(item,index);
    
    Toast.show(`点击${index}${section.index}`,1)
    
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
  image: {
    position:'absolute',
    right:10,
    top:10,
    width:20,
    height:20,
  },
  endImage: {
    position:'absolute',
    right:30,
    top:5,
    width:30,
    height:30,
    borderRadius:3,
  },
  endText: {
    position:'absolute',
    right:30,
    top:10,
    height:20,
  },
  sectionSep: {
    height:20,
  },
});
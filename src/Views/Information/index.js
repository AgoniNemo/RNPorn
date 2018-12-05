import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,SectionList,TouchableOpacity} from 'react-native';
import {Toast,ActionSheet} from 'antd-mobile-rn';
import { SCREEN , Color} from 'components/Public';
import UserManage from 'lib/UserManage';
import { USER_ACTION } from 'reduxs/action';
import { UpdateUserHeaderAction } from 'src/utils/HttpHandler';
import ImagePicker from 'react-native-image-crop-picker';

export default class Information extends Component {

  constructor(props){
    super(props)
    this.state={
      data:[],
      icon:null,
      user:null,
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
        this.setState({ 
          icon: (usr.headPath.length == 0)? require('assets/image/header.jpg') : {uri:usr.headPath},
          data: [
              { index: 0, data: [{title:'头像',type:'image'}]},
              { index: 1, data: [
                  {title:'昵称',end:usr.name,router:'ModifyInfo',type:'name'},
                  {title:'性别',end:usr.sex,router:'SettingSex',type:'sex'},
                  {title:'年龄',end:usr.age,router:'ModifyInfo',type:'age'},
                  {title:'手机号',end:usr.phoneNumber,router:'ModifyInfo',type:'phoneNumber'},
                  {title:'修改密码',end:null,router:'ModifyInfo',type:'password'}] },
          ],
          user:usr, });
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

    if (item.type == 'image') {
      this.headerClick(item, index, section);
      return
    }

    this.props.navigation.navigate(item.router,{
      item:item,
      callback: (value) => {
          let obj = this.state.data[section.index].data[index]
          if (obj.type != 'password') {
              obj.end = value
              this.setState({data:[...this.state.data]})
          }
          this.state.user[obj.type] = value
          UserManage.update(this.state.user)
          console.log(this.store);

          // store.dispatch({type: USER_ACTION,userModel:this.state.user})
      }
    });
    
  }

  headerClick(item, index, section) {
    const BUTTONS = ['拍照', '从手机相册选择', '保存图片', '取消'];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      maskClosable: true,
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          this.openCamera()
          break;
        case 1:
          this.openImageSource()
          break;
        case 2:
          this.savaImage()
          break;
        default:
          break;
      }
    });
  }

  savaImage() {
    Toast.show('图片保存成功',2)
  }

  openCamera(){
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      this.updateLoading(image)
    });
  }

  openImageSource() {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      this.updateLoading(image)
    });
  }

  updateLoading(image) {
    let formData = new FormData();
    let file = {
      uri: (Platform.OS == "ios") ? image.sourceURL:image.path, 
      type: 'multipart/form-data',
      name: (Platform.OS == "ios") ? image.filename:`${parseInt(Date.now() / 1000)}`,
      mime: image.mime,
      size: image.size,}
    formData.append("file", file);
    Toast.loading('图片上传中...',0,(()=>{}),true)
    UpdateUserHeaderAction(formData,{
      Callback:(res) => {
        console.log(res);
        Toast.hide()
        if (res.code == '0') {
            let msg = '成功'
            if (res.data.status) {
                this.setState({icon:{uri:res.data.url}})
            }else{
                msg = '失败'
            }
            Toast.show(`图片上传${msg}！`,1)
        }else{
          Toast.show(`图片上传失败！原因：${res.message}`,1.5)
        }
      },
      err:(err) =>{
        Toast.hide()
        Toast.show('网络出错！',1)
      }
    })
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
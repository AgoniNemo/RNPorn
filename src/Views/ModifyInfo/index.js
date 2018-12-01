import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View,TouchableOpacity} from 'react-native';
import {Toast,Modal} from 'antd-mobile-rn';
import { SCREEN , Color} from 'components/Public';
import UserManage from 'lib/UserManage';
import { ModifyInfoAction } from 'src/utils/HttpHandler';

export default class ModifyInfo extends Component {


    static navigationOptions = ({ navigation }) => {
        return {
          title:`修改${navigation.state.params.item.title}`,
          headerRight: (
            <TouchableOpacity activeOpacity={0.3} onPress={navigation.getParam('save')}>
                    <Text style={{color:'#000',marginRight:10}}>{'保存'}</Text>
            </TouchableOpacity>
          ),
        };
    };

    constructor(props){
        super(props)
        this.state = {
            type:null,
            oldText:null,
            newText:null,
            placeholder:null,
            user:null,  // 用户对象
        };
        this._save.bind(this)
    }

    componentWillMount() {
        const { item } = this.props.navigation.state.params;
        let p = item.title
        let text = item.end
        if (item.type == 'password') {
            p = '旧密码'
        }
        this.setState({
            placeholder:p,
            oldText:text,
            type:item.type
        })
        UserManage.get().then(usr => {
          this.setState({user:usr})
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <TextInput style={styles.textInput}  placeholder={`请输入${this.state.placeholder}`}
                    defaultValue={this.state.oldText}  onChangeText={(value)=> this.setState({oldText:value})}/>
                </View>
                {
                    (this.state.type !== 'password') ? null:
                    <View style={styles.textContainer}>
                        <TextInput style={styles.textInput}  placeholder={`请输入新密码`}
                    defaultValue={this.state.oldText}  onChangeText={(value)=> this.setState({newText:value})}/>
                    </View>
                }
            </View>
        )
    }

    componentDidMount() {
        this.props.navigation.setParams({ save: this._save });
    }

    _save = () => {
        let type = this.state.type        
        let params = new Object();
        params[type] = this.state.oldText
        if (type == 'password') {
            params['newPassword'] = this.state.newText
        }
        ModifyInfoAction(params,{
            Callback:(res) => {
              Toast.hide()
              if (res.code == '0') {
                  Toast.show(`用户信息修改成功！`,1)
                  const {goBack,state} = this.props.navigation;
                  let value = (type == 'password') ? this.state.newText : this.state.oldText
                  state.params.callback(value);
                  goBack();
              }else{
                Toast.show(res.message,1)
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
        backgroundColor:'#fff',
        marginTop:5,
        width:SCREEN.width,
        height:44,
    },
    textInput: {
        flex:1,
        marginLeft:10,
    }
});
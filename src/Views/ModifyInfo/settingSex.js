import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import {Toast,Modal} from 'antd-mobile-rn';
import { SCREEN , Color} from 'components/Public';
import UserManage from 'lib/UserManage';

export default class settingSex extends Component {
    
    static navigationOptions = ({ navigation }) => {
        return {
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
            isMan:true,
            sex:null,
          };
    }
    

    componentWillMount() {
        const { item } = this.props.navigation.state.params;
        this.setState({
            isMan:(item.end === '男'),
            sex:(item.end ? item.end :'男')
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.3} onPress={() => { this.changeSexAction('男') }}>
                    <View style={[styles.textContainer]}>
                      <Text style={[styles.normalText,(this.state.isMan?styles.selectText:null)]}>{'男'}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.3} onPress={() => { this.changeSexAction('女') }}>
                    <View style={[styles.textContainer]}>
                      <Text style={[styles.normalText,(!this.state.isMan?styles.selectText:null)]}>{'女'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    componentDidMount() {
        this.props.navigation.setParams({ save: this._save });
    }

    changeSexAction(value) {
        if (value != this.state.sex) {
            let b = this.state.isMan
            this.setState({sex:value,isMan:!b})
        }
    }

    _save() {
        Toast.show('网络出错！',1)
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
        height:40,
        marginTop:5,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderBottomColor: '#eee',
        backgroundColor:'#fff',
    },
    normalText: {
        lineHeight:40,
        marginLeft:5,
        color:'#000',
    },
    selectText: {
        color:Color.themeColor,
    }
});
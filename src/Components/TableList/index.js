import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList,
    TouchableOpacity,RefreshControl,ActivityIndicator} from 'react-native';
import { SCREEN,Color } from 'components/Public';
import DefaultListView from 'views/DefaultListView/index';

export default class TableList extends Component {

    constructor(props){
        super(props)
        this.state={
            isEmpty:false,
            isLoreMore:false,
        }
    }

    render() {
        return (
          (this.props.data.length == 0) ? null :
          <View style={styles.container}>
            <FlatList
                style={[{flex:1},{...this.props.style}]}
                horizontal={false}
                data={this.props.data}
                ListEmptyComponent={() => this.createEmptyView()}
                renderItem={(item,index) => this.renderItem(item,index)}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={this.createRefreshControl()}
                ListFooterComponent={this.createFooter()}
                onEndReachedThreshold={0.02}//执行上啦的时候10%执行
                onEndReached={this.loreMore.bind(this)}
            />
          </View>
        )
    }

    componentWillUnmount(){
      this.setState = (state,callback)=>{
        return;
      };
    }

    shouldComponentUpdate(nextProps, nextState){
        if (this.props.data === nextProps.data) {
            return false;
        }
        console.log(nextProps.refreshing,"refreshing---组件需要更新",this.props.refreshing);
        return true;
    }

    componentDidMount() {
        if (this.props.data.length == 0) {
            this.setState({isEmpty:false})
        }
        this.setState({isLoreMore:false})
    }

    // 下拉刷新
    refreshClick() {
        if (this.props.onRefresh) {
            this.props.onRefresh()
        }
    }

    // 上拉加载更多
    loreMore() {
        console.log('loreMore');
        if (!this.props.refreshing) {
            this.setState({isLoreMore:true})
            if (this.props.onEndReached) {
                this.props.onEndReached()
            }
        }
    }

    createRefreshControl() {
        return (
          <RefreshControl
            refreshing={(this.props.refreshing && this.state.isLoreMore == false)}
            onRefresh={() => this.refreshClick()}
            title="加载中..."/>
        )
      }
    
      createFooter() {
        let isShow = (this.props.refreshing && this.props.data.length > 0)
        console.log(this.state.isLoreMore,'refreshing',this.props.refreshing);
        
        return (
            (isShow) ? 
            <View style={styles.footer}>
                <ActivityIndicator animating={true} color='#333' size='small' style={{marginRight:7}}/>
                <Text style={{textAlign:'center',}}>正在加载更多数据...</Text>
            </View>  : null
        )
      }
    
      createEmptyView() {
        return(
            this.state.isEmpty  ? <DefaultListView /> : null
        )
      }
      
      renderItem(item,index){
        return this.props.renderRow(item,index);
      }
    
      cellClick(item) {
        if (this.props.cellAction) {
            this.props.cellAction(item)
        }
      }
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: Color.sectionBackgroundColor,
    },
    footer: {
        alignItems: 'center', 
        justifyContent:'center',
        height:40,
        width:SCREEN.width,
        backgroundColor:'#eee',
        flexDirection:'row'
    }
  });
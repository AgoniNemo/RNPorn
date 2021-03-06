
import React, {Component} from 'react';
import Video from 'react-native-video';
import {Toast,Modal} from 'antd-mobile-rn';
import {Platform, StyleSheet, Text,Dimensions,TouchableOpacity,View,Image,
    TouchableWithoutFeedback, Slider,ActivityIndicator,StatusBar} from 'react-native';
import Orientation from 'react-native-orientation';
import { SCREEN,Color } from 'components/Public';
import NavigationBar from 'components/NavigationBar';
import FlatList from 'components/TableList';
import ReplyCell from './ReplyCell';
import DBManager from 'lib/DBManager';
import UserManage from 'lib/UserManage';
import { CommentListAction,CollectVideoAction,CommentVideoAction } from 'src/utils/HttpHandler';

export default class VideoDetails extends Component {
    constructor(props){
        super(props)
        this.state = {
            data:[],
            refreshing:false,
            status:false, //默认为 不收藏
            page:0,
            video:null,
            videoId:null,
            user:null,  // 用户对象
            videoWidth: SCREEN.width,
            videoHeight:  SCREEN.width * 9/16, // 默认16：9的宽高比
            showVideoCover: true,    // 是否显示视频封面
            showVideoControl: false, // 是否显示视频控制组件
            isPlaying: false,        // 视频是否正在播放
            currentTime: 0,        // 视频当前播放的时间
            duration: 0,           // 视频的总时长
            isFullScreen: false,     // 当前是否全屏显示
            playFromBeginning: false, // 是否从头开始播放
            isLoading:false,
            isShow:true,
          };
    }

    render() {
      return (
        <View style={styles.container} onLayout={this._onLayout}>
          <View style={{ width: this.state.videoWidth, height: this.state.videoHeight,        
            backgroundColor:'#000000' }}>
            <Video
              ref={(ref) => this.videoPlayer = ref}
              source={this.state.isShow? {uri: this.state.video.playPath}:require('assets/video/dzs.mp4')}
              rate={1.0}
              volume={1.0}
              muted={false}
              paused={!this.state.isPlaying}
              resizeMode={'contain'}
              playWhenInactive={false}
              playInBackground={false}
              ignoreSilentSwitch={'ignore'}
              progressUpdateInterval={250.0}
              onLoadStart={this._onLoadStart}
              onLoad={this._onLoaded}
              onProgress={this._onProgressChanged}
              onEnd={this._onPlayEnd}
              onError={this._onPlayError}
              onBuffer={this._onBuffering}
              style={{width: this.state.videoWidth, height: this.state.videoHeight}}
            />
            {
              this.state.showVideoCover ?
                <Image
                  style={{
                    position:'absolute',
                    top: 0,
                    left: 0,
                    width: this.state.videoWidth,
                    height: this.state.videoHeight
                  }}
                  resizeMode={'cover'}
                  source={this.state.isShow? {uri: this.state.video.icon}:require('assets/image/back.png')}
                /> : null
            }
            <TouchableWithoutFeedback onPress={() => { this.hideControl() }}>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: this.state.videoWidth,
                  height: this.state.videoHeight,
                  backgroundColor: this.state.isPlaying ? 'transparent' : 'rgba(0, 0, 0, 0.2)',
                  alignItems:'center',
                  justifyContent:'center'
                }}>
                {
                  this.state.isPlaying ? <ActivityIndicator animating={this.state.isLoading} color='#fff' size='large'/> :
                    <TouchableWithoutFeedback onPress={() => { this.onPressPlayButton() }}>
                      <Image
                        style={styles.playButton}
                        source={require('assets/image/icon_video_play.png')}
                      />
                    </TouchableWithoutFeedback>
                }
              </View>
            </TouchableWithoutFeedback>
            {
              this.state.showVideoControl ?
                <View style={[styles.control,{width: this.state.videoWidth, height: this.state.videoHeight}]}>
                  <View style={[styles.topControl, {width: this.state.videoWidth}]}>
                    <TouchableOpacity activeOpacity={0.3} onPress={() => { this.backClick() }}>
                      <Image
                        style={styles.goBack}
                        source={require('assets/image/i_goback.png')}
                      />
                    </TouchableOpacity>
                    { this.state.isFullScreen ? <Text style={styles.topTitle}>{`   ${this.state.isShow?this.state.video.title:'这是影片标题'}`}</Text> : null }
                    <TouchableOpacity activeOpacity={0.3} onPress={() => { this.noFunction() }}>
                      <Image
                        style={styles.more}
                        source={require('assets/image/icon_video_more.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.bottomControl, {width: this.state.videoWidth}]}>
                    <TouchableOpacity activeOpacity={0.3} onPress={() => { this.onControlPlayPress() }}>
                      <Image
                        style={styles.playControl}
                        source={this.state.isPlaying ? require('assets/image/icon_control_pause.png') : require('assets/image/icon_control_play.png')}
                      />
                    </TouchableOpacity>
                    <Text style={styles.time}>{this.formatTime(this.state.currentTime)}</Text>
                    <Slider
                      style={{flex: 1}}
                      maximumTrackTintColor={'#999999'}
                      minimumTrackTintColor={'#00c06d'}
                      thumbImage={require('assets/image/icon_control_slider.png')}
                      value={this.state.currentTime}
                      minimumValue={0}
                      maximumValue={this.state.duration}
                      onValueChange={(currentTime) => { this.onSliderValueChanged(currentTime) }}
                    />
                    <Text style={styles.time}>{this.formatTime(this.state.duration)}</Text>
                    <TouchableOpacity activeOpacity={0.3} onPress={() => { this.onControlShrinkPress() }}>
                      <Image
                        style={styles.shrinkControl}
                        source={this.state.isFullScreen ? require('assets/image/icon_control_shrink_screen.png') : require('assets/image/icon_control_full_screen.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View> : null
            }
          </View>
          {
            this.state.isFullScreen ? null :
            <View style={styles.bottomContainer}>
                <View style={{flex:1}}>
                    <Text style={styles.title}>{`   ${this.state.isShow?this.state.video.title:'这是影片标题'}`}</Text>
                    <FlatList
                        data={this.state.data}
                        refreshing={this.state.refreshing}
                        renderRow={(item,index) => this.createCell(item,index)}
                        onEndReached={() => this.loreMore()}
                        onRefresh={() => this.refreshAction()}
                    />
                </View>
                <View style={styles.bottom}>
                  <TouchableOpacity activeOpacity={0.3} onPress={() => { this.collectAction() }}>
                      <Text style={[styles.btnStyle,styles.collect]}>{!this.state.status?'收藏':'取消收藏'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.3} onPress={() => this.answerAction()}>
                      <Text style={[styles.btnStyle,styles.answer]}>{`回复`}</Text>
                  </TouchableOpacity>
                </View>
            </View>
          }
        </View>
      )
    }
  
    /// -------生命周期-------

    componentWillMount() {
      const { item,isShow } = this.props.navigation.state.params;
      this.setState({
          video:item,
          isShow:isShow,
      })
      UserManage.get().then(usr => {
        this.setState({user:usr})
      });
      setTimeout(() => {
        this.fetchDataList(0)
      }, 300);

      DBManager.historyIsDataExists(item.videoId,((res) => {
          if (res) {
              this.setState({status:true});
              DBManager.delHistoryData(item.videoId,null)
          }
          let video = {
            ...item,
            video_updated_at:`${parseInt(Date.now() / 1000)}`,
          }
          DBManager.addHistoryData(item);
      }));
    }

    // shouldComponentUpdate(nextProps, nextState){
    //   if (this.state.isLoading === nextState.isLoading) {
    //       return false;
    //   }
    //   return true;
    // }

    componentWillUnmount(){
      this.setState = (state,callback)=>{
        return;
      };
    }

    /// -------Video组件回调事件-------
    
    _onLoadStart = () => {
      console.log('视频开始加载');
    };
    
    _onBuffering = () => {
      console.log('视频缓冲中...')
      this.setState({isLoading:true})
    };
    
    _onLoaded = (data) => {
      console.log('视频加载完成');
      this.setState({
        duration: data.duration,
      });
    };
    
    _onProgressChanged = (data) => {
      console.log('视频进度更新',this.state.isPlaying);
      if (this.state.isPlaying) {
          this.setState({
            currentTime: data.currentTime,
            isLoading: false,
          })
      }
    };
    
    _onPlayEnd = () => {
      console.log('视频播放结束');
      this.setState({
        currentTime: 0,
        isPlaying: false,
        playFromBeginning: true,
        isLoading:false,
      });
    };
    
    _onPlayError = () => {
      console.log('视频播放失败');
    };
    
    ///-------控件点击事件-------
    
    /// 控制播放器工具栏的显示和隐藏
    hideControl() {
      if (this.state.showVideoControl) {
        this.setState({
          showVideoControl: false,
        })
      } else {
        this.setState(
          {
            showVideoControl: true,
          },
          // 5秒后自动隐藏工具栏
          () => {
            setTimeout(
              () => {
                this.setState({
                  showVideoControl: false
                })
              }, 5000
            )
          }
        )
      }
    }

    /// 返回
    backClick() {
      this.pauseVideo()
      Orientation.lockToPortrait();
      this.props.navigation.goBack();
    }

    noFunction(){
      Toast.show('该功能暂未开放！',2)
    }
    
    /// 点击了播放器正中间的播放按钮
    onPressPlayButton() {
      let isPlay = !this.state.isPlaying;
      this.setState({
        isPlaying: isPlay,
        showVideoCover: false
      });
      if (this.state.playFromBeginning) {
        this.videoPlayer.seek(0);
        this.setState({
          playFromBeginning: false,
        })
      }
    }
    
    /// 点击了工具栏上的播放按钮
    onControlPlayPress() {
      this.onPressPlayButton();
    }
    
    /// 点击了工具栏上的全屏按钮
    onControlShrinkPress() {
      if (this.state.isFullScreen) {
        Orientation.lockToPortrait();
      } else {
        Orientation.lockToLandscape();
      }
    }
    
    /// 进度条值改变
    onSliderValueChanged(currentTime) {
      this.videoPlayer.seek(currentTime);
      if (this.state.isPlaying) {
        this.setState({
          currentTime: currentTime
        })
      } else {
        this.setState({
          currentTime: currentTime,
          isPlaying: true,
          showVideoCover: false
        })
      }
    }
    
    /// 屏幕旋转时宽高会发生变化，可以在onLayout的方法中做处理，比监听屏幕旋转更加及时获取宽高变化
    _onLayout = (event) => {
      //获取根View的宽高
      let {width, height} = event.nativeEvent.layout;
      console.log('通过onLayout得到的宽度：' + width);
      console.log('通过onLayout得到的高度：' + height);
      
      // 一般设备横屏下都是宽大于高，这里可以用这个来判断横竖屏
      let isLandscape = (width > height);
      if (isLandscape){
        this.setState({
          videoWidth: width,
          videoHeight: height,
          isFullScreen: true,
        })
      } else {
        this.setState({
          videoWidth: width,
          videoHeight: width * 9/16,
          isFullScreen: false,
        })
      }
      /**
       * 解锁对方向的锁定
       * Orientation.unlockAllOrientations();
       */
    };

    /// -------FlatList相关方法-------

    // 下拉刷新
    refreshAction() {
      this.fetchDataList(0)
    }

    // 上拉加载更多
    loreMore() {
      if (this.state.refreshing) {
        let page = this.state.page
        page += 1
        this.fetchDataList(page)
      }
    }

    fetchDataList(page) {
      this.setState({refreshing:true})
      let param = {
         id:this.state.video.videoId,
         count:20,
         page:page,
      }
      Toast.loading('加载中...',0,(()=>{}),true)
      CommentListAction(param,{
        Callback:(res) => {
          if (res.code == '0') {
             let data = res.data
             if (data.length > 0) {
                let list = this.state.data;
                if (page == 0) {
                    list = data
                }else{
                    list = list.concat(data)
                }            
                this.setState({data:list,page:page,refreshing:false})
             }
          }else{
            Toast.show(res.message,1)
          }
          Toast.hide()
          this.setState({refreshing:false})
        },
        err:(err) => {
          Toast.hide()
          Toast.show('网络出错！',1)
        }
      })
    }

    collectAction() {
      let msg = !this.state.status?'收藏':'取消收藏';

      Modal.alert('提示', `是否${msg}影片！`, [
        { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
        { text: '确定', onPress: () => {
            this.requestCollectVideo()
        }},
      ]);
    }
    
    answerAction() {
      Toast.show('回复！',2)
      Modal.prompt(
        '提示',
        null,
        (msg: any) => {
          this.onsubmmit(msg)
        },
        'default',
        null,
        ['请输入回复内容'],
      );
    }

    onsubmmit(msg) {
      let t = `${parseInt(Date.now() / 1000)}`
      let params = {
        id:this.state.video.videoId,
        content:msg,
        time:t
      }
      CommentVideoAction(params,{
        Callback:(res) => {
          Toast.hide()
          if (res.code == '0') {
                let comment = {
                  content: msg,
                  headPath: this.state.user.headPath,
                  name: this.state.user.name,
                  sex: this.state.user.sex,
                  time: t,
                  user: this.state.user.user};
                const list = [...this.state.data];
                list.unshift(comment);
                this.setState({data:list});
                Toast.show('影片回复成功',2)
          }else{
              Toast.show(res.message,1)
          }
        },
        err:(err) =>{
          Toast.show('网络出错！',1)
        }
      })
    }

    requestCollectVideo() {
      let result = !this.state.status
      let params = {
        id:this.state.video.videoId,
        collection:result?'1':'0',
      }
      Toast.loading('加载中...',0,(()=>{}),true)
      CollectVideoAction(params,{
        Callback:(res) => {
          Toast.hide()
          if (res.code == '0') {
              this.setState({status:result})
              if (result) {
                  let video = {
                    ...this.state.video,
                    video_updated_at:`${parseInt(Date.now() / 1000)}`,
                  }
                  DBManager.addCollectData(video);
              }else{
                  DBManager.delCollectData(this.state.video.videoId,null);
              }
              
              Toast.show(`${result?'收藏':'取消收藏'}成功！`,2)
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

    createCell({item,index}) {
      return (
        <ReplyCell cellClick={(item) => this.cellAction(item)} item={item}/>
      );
    }

    cellAction(item) {
      Toast.success(item.video.videoId,1)
    }
    
    /// -------外部调用事件方法-------
    
    ///播放视频，提供给外部调用
    playVideo() {
      this.setState({
        isPlaying: true,
        showVideoCover: false
      })
    }
    
    /// 暂停播放，提供给外部调用
    pauseVideo() {
      this.setState({
        isPlaying: false,
      })
    }
    
    /// 切换视频并可以指定视频开始播放的时间，提供给外部调用
    switchVideo(videoURL, seekTime) {
      let video = this.state.video;
      video.playPath = videoURL;
      this.setState({
        video: video,
        currentTime: seekTime,
        isPlaying: true,
        showVideoCover: false
      });
      this.videoPlayer.seek(seekTime);
    }

    /// -------其他事件方法-------

    formatTime(second) {
      let h = 0, i = 0, s = parseInt(second);
      if (s > 60) {
        i = parseInt(s / 60);
        s = parseInt(s % 60);
      }
      // 补零
      let zero = function (v) {
        return (v >> 0) < 10 ? "0" + v : v;
      };
      return [zero(h), zero(i), zero(s)].join(":");
  }

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      height: SCREEN.height,
    },
    playButton: {
      width: 50,
      height: 50,
    },
    goBack: {
      width: 24,
      height: 24,
      marginTop:Platform.OS == 'ios'?0:20,
      marginLeft:10,
    },
    more: {
      width: 24,
      height: 24,
      marginTop:Platform.OS == 'ios'?0:20,
      marginRight:10,
    },
    playControl: {
      width: 24,
      height: 24,
      marginLeft: 15,
    },
    shrinkControl: {
      width: 15,
      height: 15,
      marginRight: 15,
    },
    time: {
      fontSize: 12,
      color: 'white',
      marginLeft: 10,
      marginRight: 10
    },
    control: {
      position: 'absolute',
      top:0,
      left:0,
    },
    bottomControl: {
      flexDirection: 'row',
      height: 44,
      alignItems:'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      position: 'absolute',
      bottom: 0,
      left: 0
    },
    topControl: {
      flexDirection: 'row',
      justifyContent:'space-between',
      height: Platform.OS == 'ios'?44:54,
      alignItems:'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      position: 'absolute',
      top: 0,
      left: 0
    },
    bottomContainer: {
      flex:1,
      justifyContent:'space-between',
    },
    topTitle: {
      marginTop:25,
      marginBottom:3,
      fontSize:15,
      color:'#fff',
    },
    title: {
      marginTop:3,
      marginBottom:3,
      fontSize:15,
    },
    bottom: {
      flexDirection: 'row',
    },
    btnStyle: {
      height:44,
      lineHeight:44,
      width:SCREEN.width/2,
      fontSize:16,
      textAlign:'center',
      color:'#fff',
    },
    collect: {
      backgroundColor:'#000',
      borderColor:'#000',
    },
    answer: {
      backgroundColor:Color.themeColor,
      borderColor:Color.themeColor,
    },
});
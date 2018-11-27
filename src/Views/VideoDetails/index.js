
import React, {Component} from 'react';
import Video from 'react-native-video';
import {Toast,Button} from 'antd-mobile-rn';
import {Platform, StyleSheet, Text,Dimensions,TouchableOpacity,View,Image,
    TouchableWithoutFeedback, Slider,ActivityIndicator,StatusBar} from 'react-native';
import Orientation from 'react-native-orientation';
import { SCREEN,Color } from 'components/Public';
import NavigationBar from 'components/NavigationBar';
import FlatList from 'components/TableList';

export default class VideoDetails extends Component {
    constructor(props){
        super(props)
        this.state = {
            data:[],
            videoUrl: null,
            videoCover: 'assets/image/back.png',
            videoWidth: SCREEN.width,
            videoHeight:  SCREEN.width * 9/16, // 默认16：9的宽高比
            showVideoCover: true,    // 是否显示视频封面
            showVideoControl: false, // 是否显示视频控制组件
            isPlaying: false,        // 视频是否正在播放
            currentTime: 0,        // 视频当前播放的时间
            duration: 0,           // 视频的总时长
            isFullScreen: false,     // 当前是否全屏显示
            playFromBeginning: false, // 是否从头开始播放
            title:null,
            isLoading:false,
          };
    }
    
    componentWillMount() {
      const { item } = this.props.navigation.state.params;
      this.setState({
          videoUrl:item.playPath,
          videoCover:item.icon,
          title:item.title,
      })
    }

      render() {
        return (
          <View style={styles.container} onLayout={this._onLayout}>
            <View style={{ width: this.state.videoWidth, height: this.state.videoHeight,        
              backgroundColor:'#000000' }}>
              <Video
                ref={(ref) => this.videoPlayer = ref}
                source={{uri: this.state.videoUrl}}
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
                    source={{uri: this.state.videoCover}}
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
                      <TouchableOpacity activeOpacity={0.3} onPress={() => { this.backClick() }}>
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
                  <Text>{`   ${this.state.title}`}</Text>
                  <View style={styles.bottom}>
                    <TouchableOpacity activeOpacity={0.3} onPress={() => { this.collectAction() }}>
                        <Text style={[styles.btnStyle,styles.collect]}>{`收藏`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.3} onPress={() => { this.answerAction() }}>
                        <Text style={[styles.btnStyle,styles.answer]}>{`回复`}</Text>
                    </TouchableOpacity>
                  </View>
              </View>
            }
          </View>
        )
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
        this.setState({isLoading:false})
        this.setState({
          duration: data.duration,
        });
      };
      
      _onProgressChanged = (data) => {
        console.log('视频进度更新');
        if (this.state.isPlaying) {
          this.setState({
            currentTime: data.currentTime,
          })
        }
      };
      
      _onPlayEnd = () => {
        console.log('视频播放结束');
        this.setState({
          currentTime: 0,
          isPlaying: false,
          playFromBeginning: true
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
        Orientation.unlockAllOrientations();
        this.props.navigation.goBack();
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
        this.setState({
          videoUrl: videoURL,
          currentTime: seekTime,
          isPlaying: true,
          showVideoCover: false
        });
        this.videoPlayer.seek(seekTime);
      }

      /// -------其他事件方法-------

      collectAction() {
        Toast.show('收藏成功！',2)
      }
      
      answerAction() {
        Toast.show('回复！',2)
      }

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
      marginLeft:10,
    },
    more: {
      width: 24,
      height: 24,
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
      height: 44,
      alignItems:'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      position: 'absolute',
      top: 0,
      left: 0
    },
    bottomContainer: {
      position: 'absolute',
      bottom:0,
      width:SCREEN.width,
      height:SCREEN.height - SCREEN.width * 9/16-StatusBar.currentHeight,
    },
    bottom: {
      flexDirection: 'row',
      position:'absolute',
      bottom:0,
      left:0,
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
      backgroundColor:Color.theme,
      borderColor:Color.theme,
    },
    answer: {
      backgroundColor:'#000',
      borderColor:'#000',
    },
});
import MainTab from 'components/TabNavigator';
import Login from 'views/Login/index';
import Setting from 'views/Setting/index';
import VideoDetails from 'views/VideoDetails/index';

/*
    --- 路由配置 ---

   * 所有组件都必须在这里注册
   * 在这里设置的navigationOptions的权限 > 对应页面里面的 static navigationOptions的设置 > StackNavigator()第二个参数里navigationOptions的设置
   * 该配置文件会在App.js里的StackNavigator(导航组件)里使用。

*/
const RouteConfig = {
    Login: {
        screen: Login,
        navigationOptions: ({navigation}) => ({header: null, gesturesEnable: true})
    },
    MainTab: {
        screen:MainTab,
        navigationOptions: ({navigation}) => ({
            gesturesEnable: true, //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
            header: null,
        }),
        headerMode: 'screen',
        mode: 'card',
    },
    Setting: {
        screen: Setting,
        navigationOptions: ({navigation}) => ({title: '设置',gesturesEnable: true})
    },
    VideoDetails:{
        screen: VideoDetails,
        navigationOptions: ({navigation}) => ({header: null, gesturesEnable: true})
    },
}

export default RouteConfig;
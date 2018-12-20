import React, {Component} from 'react';
import { Toast } from 'antd-mobile-rn';
import { createStackNavigator} from 'react-navigation';
import { Easing,Animated,BackHandler,Platform } from 'react-native';
import RouteConfig from 'src/Components/RouteConfig/index';
import TransitionConfiguration from './NavigatorAnimated';
import Orientation from 'react-native-orientation';
import { Color } from 'components/Public';

let routes = [];
let lastBackPressed = null;
export default class Navigation extends Component {

    constructor(props){
        super(props)
        this.state={
            isLoggedIn:false,
            navigator:null,
        }
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        Orientation.lockToPortrait()
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        lastBackPressed = null;
    }

    onBackAndroid() {
        if (routes.length === 2) { // 根界面
            if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
                BackHandler.exitApp()
                return false;
            }
            lastBackPressed = Date.now();
            Toast.show('再点击一次退出应用',1);
            return true;
        }
    }
    
    render() {
        let AppNavigator = createStackNavigator(RouteConfig, {
            initialRouteName: this.state.isLoggedIn ? 'MainTab':'Login',
            headerMode: 'screen',
            transitionConfig: TransitionConfiguration,
            navigationOptions: {
                headerStyle: {
                  paddingTop: Platform.OS == 'ios'? 0 : 20,
                  height: Platform.OS == 'ios'? 44 : 64,
                  backgroundColor: Color.themeColor,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
            }
        });
        return (
            <AppNavigator onNavigationStateChange={(prevNav, nav, action) => {
                routes = nav.routes;
            }}/>
        );
    }
}
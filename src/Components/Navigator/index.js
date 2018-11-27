import React, {Component} from 'react';
import { Toast } from 'antd-mobile-rn';
import { createStackNavigator} from 'react-navigation';
import { Easing,Animated,BackHandler } from 'react-native';
import RouteConfig from 'src/Components/RouteConfig/index';
import TransitionConfiguration from './NavigatorAnimated';

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
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        lastBackPressed = null;
    }

    onBackAndroid() {
        if (routes.length === 2) { // 根界面
            if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
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
        });
        return (
            <AppNavigator onNavigationStateChange={(prevNav, nav, action) => {
                routes = nav.routes;
            }}/>
        );
    }
}
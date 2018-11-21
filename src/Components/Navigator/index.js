import { createStackNavigator} from 'react-navigation';
import { Easing,Animated } from 'react-native';
import RouteConfig from 'src/Components/RouteConfig/index';
import TransitionConfiguration from './NavigatorAnimated';

export default function configAppNavigator(isLoggedIn) {
    return createStackNavigator(RouteConfig, {
        initialRouteName: isLoggedIn ? 'MainTab':'Login',
        headerMode: 'screen',
        transitionConfig: TransitionConfiguration,
    });
}
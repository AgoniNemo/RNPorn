import { createStackNavigator} from 'react-navigation';

import RouteConfig from 'src/Components/RouteConfig/index'
import TabNavigator from 'src/Components/TabNavigator/index'

export default function configAppNavigator(isLoggedIn) {
    return createStackNavigator(RouteConfig, {
        initialRouteName: isLoggedIn ? 'MainTab':'Login',
    });
}
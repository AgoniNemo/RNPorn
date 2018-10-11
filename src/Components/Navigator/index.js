import Home from 'views/Home/index'
import Login from 'views/Login/index'
import { createStackNavigator } from 'react-navigation';

import RouteConfig from 'src/Components/RouteConfig/index'
import TabNavigator from 'src/Components/TabNavigator/index'
const Navigator = createStackNavigator(RouteConfig, TabNavigator);

export default Navigator;
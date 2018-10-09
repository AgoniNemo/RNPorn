import Home from 'views/Home/index'
import Login from 'views/Login/index'
import { StackNavigator } from 'react-navigation';

import RouteConfig from 'src/Components/RouteConfig/index'
import TabNavigator from 'src/Components/TabNavigator/index'
const Navigator = StackNavigator(RouteConfig, TabNavigator);

// const Navigator = StackNavigator(
//     {
//        Home: { screen: Home },
//        Login: { screen: Login }
//     },
//     {
//       headerMode:'screen'
//     }
// );

export default Navigator;
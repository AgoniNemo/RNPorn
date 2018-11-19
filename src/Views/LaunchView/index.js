import React, {Component} from 'react';
import configAppNavigator from 'src/Components/Navigator/index';
import UserManage from 'lib/UserManage';


export default class LaunchView extends Component {

  render() {    
    const AppNavigator = configAppNavigator(false);
    return (
        <AppNavigator />
    );
  }
}
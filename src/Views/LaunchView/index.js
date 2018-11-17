import React, {Component} from 'react';
import configAppNavigator from 'src/Components/Navigator/index';
import UserManage from 'lib/UserManage';

class LaunchView extends Component {

  constructor(props){
    super(props)
    this.state={
      isLogin: false,
    }
  }

  componentWillMount() {
    const than = this;
    let result = UserManage.get();
    console.log('result--',result);
  }

  render() {
    const { isLogin } = this.state;
    const AppNavigator = configAppNavigator(isLogin);
    return (
        <AppNavigator />
    );
  }
  
}

export default LaunchView;
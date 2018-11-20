import React, {Component} from 'react';
import { connect } from 'react-redux';
import LaunchView from 'views/LaunchView/index';
import { USER_ACTION } from 'reduxs/action';
import UserManage from 'lib/UserManage';

class Root extends Component {

  componentWillMount() {
    
    UserManage.get().then(usr => {
        this.props.changeUser(usr)
    });
    
  }

  render() {
    return (
       <LaunchView />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userModel: state.userModel,
  }
}

const mapDispatchToProps = (dispatch) => {    
    return {
        changeUser: (userModel) => dispatch({type: USER_ACTION,userModel:userModel}),
    }
}

export default connect(null, mapDispatchToProps)(Root);
import React, {Component} from 'react';
import { connect } from 'react-redux';
import LaunchView from 'views/LaunchView/index';
import { USER_ACTION } from 'reduxs/action/action';
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
      user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {    
    return {
        changeUser: (usr) => dispatch({type: USER_ACTION,user:usr}),
    }
}

export default connect(null, mapDispatchToProps)(Root);
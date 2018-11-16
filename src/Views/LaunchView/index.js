import React, {Component} from 'react';
import Navigator from 'src/Components/Navigator/index';
import Login from 'views/Login/index';

export default class LaunchView extends Component {

  constructor(props){
    super(props)
    this.state={
      isLoading:true
    }
  }

  render() {
    console.log('---',Navigator.router);
    return (
      this.state.isLoading ?
      <Login /> : <Navigator />
    )
  }

}
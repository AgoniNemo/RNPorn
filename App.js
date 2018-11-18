/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Root from 'views/Root/index';
import configureStore from 'reduxs/store/store';
import { Provider } from 'react-redux';

const store = configureStore()

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    )
  }
}

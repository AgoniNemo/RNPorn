'use strict';

import { combineReducers } from 'redux';
import userReducer from './user';
import appStatus from './appStatus';

export default combineReducers({
    userModel: userReducer,
    status: appStatus,
});
import { APP_STATUS_ACTION } from 'reduxs/action';

const appStatusReducer = (state = {status:false}, action) => {
    const newState = state;
    const status = action.status;
    
    switch (action.type) {
        case APP_STATUS_ACTION:
            return {
                ...state,
                status: status
            }
        default:
            return {
                ...state
            }
    }
}

export default appStatusReducer;
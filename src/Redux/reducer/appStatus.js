import { APP_STATUS_ACTION } from 'reduxs/action';

const appStatusReducer = (state = {status:false}, action) => {
    const newState = state.status;
    const status = action.status;
    
    switch (action.type) {
        case APP_STATUS_ACTION:
            return {
                ...newState,
                ...status
            }
        default:
            return {
                ...newState
            }
    }
}

export default appStatusReducer;
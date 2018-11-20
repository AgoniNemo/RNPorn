import { USER_ACTION } from 'reduxs/action';

const userReducer = (state = {userModel:null}, action) => {
    const newState = state;
    const userModel = action.userModel;
    
    switch (action.type) {
        case USER_ACTION:
            return {
                ...state,
                ...userModel,
            }
        default:
            return {
                ...state
            }
    }
}

export default userReducer;
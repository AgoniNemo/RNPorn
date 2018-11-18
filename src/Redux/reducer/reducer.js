import { USER_ACTION } from 'reduxs/action/action';

const userReducer = (state = {user:null}, action) => {
    const newState = state;
    const user = action.user;

    switch (action.type) {
        case USER_ACTION:
            return {
                ...state,
                user: user
            }
        default:
            return {
                ...state,
                user: user
            }
    }
}

export default userReducer;
import { USER_ACTION } from 'reduxs/action';

const userReducer = (state = {userModel:null}, action) => {
    const newState = state.userModel ? state.userModel : {};
    const userModel = action.userModel;

    switch (action.type) {
        case USER_ACTION:
            return {
                ...newState,
                ...userModel,
            }
        default:
            return {
                ...newState,
            }
    }
}
export default userReducer;
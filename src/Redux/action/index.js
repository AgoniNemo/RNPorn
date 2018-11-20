export const USER_ACTION = 'USER_ACTION';
export const APP_STATUS_ACTION = 'USER_ACTION';

export const userAction = (userModel) => {
    return {
        type: USER_ACTION,
        ...userModel
    }
}

export const appStatusAction = (status) => {
    return {
        type: APP_STATUS_ACTION,
        ...status
    }
}
export const USER_ACTION = 'USER_ACTION';

export const userAction = (user) => {
    return {
        type: USER_ACTION,
        user
    }
}
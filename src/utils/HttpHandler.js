import { requestVideoList, requestCategoriesList } from 'src/Api';
import UserManage from 'lib/UserManage';


/**
 * 单个分类列表
 *
 * @class      CategoriesListAction (name)
 * @param      {Object}    arg1         The argument 1
 * @param      {Function}  arg1.commit  The commit
 * @param      {<type>}    accountData  The account data
 * @return     {Promise}   { description_of_the_return_value }
 */
export const CategoriesListAction = (params,Callback) => {
    return UserManage.get().then(usr => {
        const p = {
            ...params,
            user:usr.user,
            token:usr.token,
        }
        requestCategoriesList(p).then(res => {
            Callback(res)
        }).catch(e => {
            console.log(e)
            Callback(e)
        })
    });
}

/**
 * 首界面列表
 *
 * @class      VideoListAction (name)
 * @param      {Object}    arg1         The argument 1
 * @param      {Function}  arg1.commit  The commit
 * @param      {<type>}    accountData  The account data
 * @return     {Promise}   { description_of_the_return_value }
 */
export const VideoListAction = (params,Callback) => {
    return UserManage.get().then(usr => {
        const p = {
            ...params,
            user:usr.user,
            token:usr.token,
        }
        requestCategoriesList(p).then(res => {
            Callback(res)
        }).catch(e => {
            console.log(e)
            Callback(e)
        })
    });
}

/***
 * export const CategoriesListAction = ({commit}, accountData) => {
    return new Promise((resolve, reject) => {
        requestCategoriesList(params).then(res => {
            
            resolve(res)
        }).catch(e => {
            console.log(e)
            resolve(e)
        })
    })
}
 */
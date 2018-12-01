import { requestVideoList, requestCategoriesList,
         requestCommentList,requestCollectVideo,
         requestCommentVideo,requestModifyInfo,
         requestUpdateUserImage } from 'src/Api';
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
export const CategoriesListAction = (params,{Callback,err}) => {
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
            err(e)
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
export const VideoListAction = (params,{Callback,err}) => {
    return UserManage.get().then(usr => {
        const p = {
            ...params,
            user:usr.user,
            token:usr.token,
        }
        requestVideoList(p).then(res => {
            Callback(res)
        }).catch(e => {
            console.log(e)
            err(e)
        })
    });
}

/**
 * 评论列表
 *
 * @class      CommentListAction (name)
 * @param      {Object}    arg1         The argument 1
 * @param      {Function}  arg1.commit  The commit
 * @param      {<type>}    accountData  The account data
 * @return     {Promise}   { description_of_the_return_value }
 */
export const CommentListAction = (params,{Callback,err}) => {
    return UserManage.get().then(usr => {
        const p = {
            ...params,
            user:usr.user,
            token:usr.token,
        }
        requestCommentList(p).then(res => {
            Callback(res)
        }).catch(e => {
            console.log(e)
            err(e)
        })
    });
}
/**
 * 评论影片
 *
 * @class      CommentVideoAction (name)
 * @param      {Object}    arg1         The argument 1
 * @param      {Function}  arg1.commit  The commit
 * @param      {<type>}    accountData  The account data
 * @return     {Promise}   { description_of_the_return_value }
 */
export const CommentVideoAction = (params,{Callback,err}) => {
    return UserManage.get().then(usr => {
        const p = {
            ...params,
            user:usr.user,
            token:usr.token,
        }
        requestCommentVideo(p).then(res => {
            Callback(res)
        }).catch(e => {
            console.log(e)
            err(e)
        })
    });
}

/**
 * 收藏影片
 *
 * @class      CommentListAction (name)
 * @param      {Object}    arg1         The argument 1
 * @param      {Function}  arg1.commit  The commit
 * @param      {<type>}    accountData  The account data
 * @return     {Promise}   { description_of_the_return_value }
 */
export const CollectVideoAction = (params,{Callback,err}) => {
    return UserManage.get().then(usr => {
        const p = {
            ...params,
            user:usr.user,
            token:usr.token,
        }
        requestCollectVideo(p).then(res => {
            Callback(res)
        }).catch(e => {
            console.log(e)
            err(e)
        })
    });
}

/**
 * 用户头像上传
 *
 * @class      ModifyInfoAction (name)
 * @param      {Object}    arg1         The argument 1
 * @param      {Function}  arg1.commit  The commit
 * @param      {<type>}    accountData  The account data
 * @return     {Promise}   { description_of_the_return_value }
 */
export const updateUserHeaderAction = (formData,{Callback,err}) => {
    return UserManage.get().then(usr => {
        formData.append('user', usr.user);
        formData.append('token', usr.token);
        formData.append('name', usr.name + Date.parse(new Date()));
        requestUpdateUserImage(formData).then(res => {
            Callback(res)
        }).catch(e => {
            console.log(e)
            err(e)
        })
    });
}

/**
 * 修改个人信息
 *
 * @class      ModifyInfoAction (name)
 * @param      {Object}    arg1         The argument 1
 * @param      {Function}  arg1.commit  The commit
 * @param      {<type>}    accountData  The account data
 * @return     {Promise}   { description_of_the_return_value }
 */
export const ModifyInfoAction = (params,{Callback,err}) => {
    return UserManage.get().then(usr => {
        const p = {
            ...params,
            user:usr.user,
            token:usr.token,
        }
        requestModifyInfo(p).then(res => {
            Callback(res)
        }).catch(e => {
            console.log(e)
            err(e)
        })
    });
}
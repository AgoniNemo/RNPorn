import request from 'lib/request/index'
import qs from 'query-string';



export const baseData = data => {
    return qs.stringify({
        user:'111',
        token:'',
        ...data
    })
}

/**
 * 登录
 *
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestLogin = data => {
    return request({
            url: `user/login`,
            method: 'post',
            data: qs.stringify({
                ...data
            })
        })
        .then(res => res.data)
}

/**
 * 首页列表
 *
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestVideoList = data => {
    return request({
            url: `video/latestVideo`,
            method: 'post',
            data: qs.stringify({
                ...data
            })
        })
        .then(res => res.data)
}



/**
 * 单个分类列表
 *
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestCategoriesList = data => {
    return request({
            url: `video/sortQuery`,
            method: 'post',
            data: qs.stringify({
                ...data
            })
        })
        .then(res => res.data)
}


/**
 * 评论列表
 *
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestCommentList = data => {
    return request({
            url: `comment/list`,
            method: 'post',
            data: qs.stringify({
                ...data
            })
        })
        .then(res => res.data)
}

/**
 * 评论影片
 *
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestCommentVideo = data => {
    return request({
            url: `comment/commit`,
            method: 'post',
            data: qs.stringify({
                ...data
            })
        })
        .then(res => res.data)
}

/**
 * 收藏影片
 *
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestCollectVideo = data => {
    return request({
            url: `video/colState`,
            method: 'post',
            data: qs.stringify({
                ...data
            })
        })
        .then(res => res.data)
}

/**
 * 用户收藏影片列表
 *
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestCollectVideoList = data => {
    return request({
            url: `video/collectionList`,
            method: 'post',
            data: qs.stringify({
                ...data
            })
        })
        .then(res => res.data)
}

/**
 * 用户头像上传
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestUpdateUserImage = data => {
    return request({
            url: `file/updateImage`,
            method: 'post',
            data: data
        })
        .then(res => res.data);
};

/**
 * 修改个人信息
 *
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestModifyInfo = data => {
    return request({
            url: `user/modifyInfo`,
            method: 'post',
            data: qs.stringify({
                ...data
            })
        })
        .then(res => res.data)
}

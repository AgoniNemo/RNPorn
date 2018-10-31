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
import axios from 'axios';
import config from './config';

/**
 * [创建axios 实例]
 * @type {[type]}
 */
const service = axios.create({
    baseURL: config.api.base,
    timeout: config.map.timeout
})

/**
 * [统一拦截请求]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
service.interceptors.request.use(cfg => {
    cfg.headers['Accept'] = config.map.headers.Accept || null
    return cfg
}, error => {
    console.log(error) // 打印测试
    Promise.reject(error)
})
/**
 * [统一拦截响应]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
service.interceptors.response.use(
    response => response,
    error => {
        console.log('error' + error) // 打印测试
        return Promise.reject(error)
    }
)

export default service

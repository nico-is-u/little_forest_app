import type {Res} from './types/common'
import type {loginRef} from './types/users'
import { http } from '@/http/http'

/**
 * @发起用户登录
 */
export async function userLogin(params: loginRef): Promise<Res> {
    return await http.post('users/login', params)
}

/**
 * @获取用户信息
 */
export async function getUserInfo(): Promise<Res> {
    return await http.get('users/info')
}
import type {smsCodeRef} from './types/common'
import { http } from '@/http/http'

/**
 * @获取短信验证码
 */
export function getSmsCode(params: smsCodeRef) {
    return http.get('get/sms_code', params)
}

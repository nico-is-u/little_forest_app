export interface UserInfoRes {
    userId: number,               // 用户id
    user_code: string,            // 用户代码
    phone: string,                // 手机号
    username: string,             // 用户名
    nickname: string,             // 昵称
    portrait: string,             // 头像
    sex: number                   // 性别     1 男  2 女
    signature:string,             // 签名

    integral?:number,             // 积分
    balance?:number,              // 余额
    couponCount?:number,          // 优惠券数量
}

export const userInfoState: UserInfoRes = {
  userId: -1,
  user_code:'',
  phone: '',
  username: '',
  nickname: '',
  portrait: '',       // 默认头像，没有就是没有，根据性别设置默认头像
  sex:0,
  signature:'',
}
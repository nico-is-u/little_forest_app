export interface UserInfoRes {
    userId: number,
    username: string,
    nickname: string,
    portrait: string
}

export const userInfoState: UserInfoRes = {
  userId: -1,
  username: '',
  nickname: '',
  portrait: '',       // 默认头像，没有就是没有，根据性别设置默认头像
}
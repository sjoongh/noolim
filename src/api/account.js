import req from './req-wrapper'

// URL 경로 설정
const ACCOUNT_URI = {
  LOGIN: '/auth/login',
  USER: '/users'
}

export default {
  // login success or fail 여부
  login (body, success, fail) {
    req.post(ACCOUNT_URI.LOGIN, body, success, fail)
  },
  // if login succes? user data 가져옴
  getUser (success) {
    req.get(ACCOUNT_URI.USER, success)
  },
  // 회원가입 기능 미구현
  signup () {
  }
}

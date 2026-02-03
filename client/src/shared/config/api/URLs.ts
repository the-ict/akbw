const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com';

const ENDP_POSTS = '/posts/';
const ENDP_SEND_SMS = "/sms/send";
const ENDP_VERIFY_SMS = "/sms/verify";
const ENDP_LOGIN = "/auth/login";
const ENDP_REGISTER = "/auth/register";


export {
  BASE_URL,
  ENDP_POSTS,
  ENDP_SEND_SMS,
  ENDP_VERIFY_SMS,
  ENDP_LOGIN,
  ENDP_REGISTER
};


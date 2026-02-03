const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com';

const ENDP_POSTS = '/posts/';
const ENDP_SEND_SMS = "/sms/send";
const ENDP_VERIFY_SMS = "/sms/verify";

export {
  BASE_URL,
  ENDP_POSTS,
  ENDP_SEND_SM,
  ENDP_VERIFY_SMS
};

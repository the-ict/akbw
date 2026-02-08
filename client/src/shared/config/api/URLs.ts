const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';


const ENDP_POSTS = '/posts/';
const ENDP_SEND_SMS = "/sms/send";
const ENDP_VERIFY_SMS = "/sms/verify";
const ENDP_LOGIN = "/auth/login";
const ENDP_REGISTER = "/auth/register";
const ENDP_PRODUCT = "/product";
const ENDP_PRODUCT_CATEGORIES = "/product/categories";
const ENDP_PRODUCT_SIZES = "/product/sizes";
const ENDP_PRODUCT_COLORS = "/product/colors";
const ENDP_REVIEW = "/review";


export {
  BASE_URL,
  ENDP_POSTS,
  ENDP_SEND_SMS,
  ENDP_VERIFY_SMS,
  ENDP_LOGIN,
  ENDP_REGISTER,
  ENDP_PRODUCT,
  ENDP_PRODUCT_CATEGORIES,
  ENDP_PRODUCT_SIZES,
  ENDP_PRODUCT_COLORS,
  ENDP_REVIEW
};



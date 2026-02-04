const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const ENDP_POSTS = '/posts/';
const ENDP_SEND_SMS = "/sms/send";
const ENDP_VERIFY_SMS = "/sms/verify";
const ENDP_USERS = "/user";
const ENDP_PRODUCT = "/product";
const ENDP_PRODUCT_CATEGORIES = "/product/categories";
const ENDP_PRODUCT_SIZES = "/product/sizes";
const ENDP_PRODUCT_COLORS = "/product/colors";

export {
  BASE_URL,
  ENDP_POSTS,
  ENDP_SEND_SMS,
  ENDP_VERIFY_SMS,
  ENDP_USERS,
  ENDP_PRODUCT,
  ENDP_PRODUCT_CATEGORIES,
  ENDP_PRODUCT_SIZES,
  ENDP_PRODUCT_COLORS
};

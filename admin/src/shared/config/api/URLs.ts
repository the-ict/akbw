const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const ENDP_POSTS = '/posts/';
const ENDP_SEND_SMS = "/sms/send";
const ENDP_VERIFY_SMS = "/sms/verify";
const ENDP_USERS = "/user";
const ENDP_PRODUCT = "/product";
const ENDP_PRODUCT_CATEGORIES = "/product/categories";
const ENDP_PRODUCT_SIZES = "/product/sizes";
const ENDP_PRODUCT_COLORS = "/product/colors";
const ENDP_ADMIN = "/admin";
const ENDP_PRODUCT_CREATE = "/product";
const ENDP_PRODUCT_CATEGORIES_CREATE = "/product/categories";
const ENDP_UPLOAD = "/upload";
const ENDP_ORDER = "/order"
const ENDP_NOTIFICATION = "/notification";

export {
  BASE_URL,
  ENDP_POSTS,
  ENDP_SEND_SMS,
  ENDP_VERIFY_SMS,
  ENDP_USERS,
  ENDP_PRODUCT,
  ENDP_PRODUCT_CATEGORIES,
  ENDP_PRODUCT_SIZES,
  ENDP_PRODUCT_COLORS,
  ENDP_ADMIN,
  ENDP_PRODUCT_CREATE,
  ENDP_PRODUCT_CATEGORIES_CREATE,
  ENDP_UPLOAD,
  ENDP_ORDER,
  ENDP_NOTIFICATION
};

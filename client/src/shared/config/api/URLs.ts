const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const ENDP_POSTS = '/posts/';
const ENDP_SEND_SMS = '/sms/send';
const ENDP_VERIFY_SMS = '/sms/verify';
const ENDP_LOGIN = '/auth/login';
const ENDP_REGISTER = '/auth/register';
const ENDP_PRODUCT = '/product';
const ENDP_PRODUCT_CATEGORIES = '/product/categories';
const ENDP_PRODUCT_SIZES = '/product/sizes';
const ENDP_PRODUCT_COLORS = '/product/colors';
const ENDP_REVIEW = '/review';
const ENDP_CATEGORIES = '/product/categories';
const ENDP_COLORS = '/product/colors';
const ENDP_SIZES = '/product/sizes';
const ENDP_UPLOAD = '/upload';
const ENDP_NOTIFICATIONS = '/notification';
const ENDP_SUPPORT_CHAT_CREATE = '/chat';
const ENDP_SUPPORT_CHAT_MESSAGE_CREATE = '/chat/help-chat-message';
const ENDP_ASK_CHAT_CREATE = '/chat/ask-for-product-chat';
const ENDP_ASK_CHAT_MESSAGE_CREATE = '/chat/ask-for-product-message';

const ENDP_STYLE = '/style';

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
  ENDP_REVIEW,
  ENDP_CATEGORIES,
  ENDP_COLORS,
  ENDP_SIZES,
  ENDP_UPLOAD,
  ENDP_NOTIFICATIONS,
  ENDP_SUPPORT_CHAT_CREATE,
  ENDP_SUPPORT_CHAT_MESSAGE_CREATE,
  ENDP_ASK_CHAT_CREATE,
  ENDP_ASK_CHAT_MESSAGE_CREATE,
  ENDP_STYLE,
};

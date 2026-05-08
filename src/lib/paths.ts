import { OrderMethodType } from '@/domains/order'

export const PAGE_PATHS = {
  // 홈
  HOME: '/',

  // 계정
  ACCOUNT_INFO: '/account/info',
  ACCOUNT_PASSWORD: '/account/password',
  ACCOUNT_PROFILE: '/account/profile',

  // 광고
  ADVERTISING: '/advertising',

  // 인증
  REGISTER: '/register',
  AUTH_LOGIN: '/auth/login',
  AUTH_SIGNUP: '/auth/signup',
  AUTH_SIGNUP_SOCIAL: '/auth/signup/social',
  AUTH_PHONE_VERIFICATION: '/auth/phone-verification',
  AUTH_SIGNUP_COMPLETE: '/auth/signup/complete',
  AUTH_CALLBACK_KAKAO: '/auth/callback/kakao',
  AUTH_CALLBACK_NAVER: '/auth/callback/naver',
  AUTH_CALLBACK_FACEBOOK: '/auth/callback/facebook',

  // 버그 리포트
  BUG_REPORTS: '/bug-reports',

  // 쿠폰
  COUPONS: '/coupons',
  COUPON_DETAIL: (id: string | number) => `/coupons/${id}`,

  // 고객 센터
  CUSTOMER_CENTER: '/customer-center',

  // 이벤트
  EVENTS: '/events',
  EVENT_DETAIL: (id: string | number) => `/events/${id}`,

  // FAQ
  FAQS: '/faqs',

  // 등급
  GRADE: '/grade',

  // 지도
  // MAP paths (if needed)

  // 회원
  MEMBERS: '/members',
  MEMBER_DETAIL: (id: string | number) => `/members/${id}`,
  MEMBER_FOLLOWS: (id: string | number, tab?: 'following' | 'follower') =>
    `/members/${id}/follows${tab ? `?tab=${tab}` : ''}`,

  // 공지사항
  NOTICES: '/notices',

  // 주문
  ORDERS: '/orders',
  ORDER_METHOD: (placeId: string | number) => `/places/${placeId}/order/method`,
  ORDER_MENUS: (placeId: string | number, method: OrderMethodType) =>
    `/places/${placeId}/order/menus?orderMethod=${encodeURIComponent(method)}`,
  ORDER_MENU_DETAIL: (placeId: number, menuId: number) =>
    `/places/${placeId}/order/menus/${menuId}`,
  ORDER_CART: (placeId: string | number) => `/places/${placeId}/order/cart`,
  ORDER_CHECKOUT: (placeId: string | number) => `/places/${placeId}/order/checkout`,
  ORDER_DETAIL: (orderId: string | number) => `/orders/${orderId}`,
  ORDER_COMPLETE: (orderId: string | number) => `/orders/${orderId}/complete`,
  ORDERS_REVIEWS_CREATE: (orderItemId: number) =>
    `/orders/reviews/create?orderItemId=${orderItemId}`,
  ORDERS_REVIEWS_EDIT: (orderProductId: number) =>
    `/orders/reviews/edit?orderProductId=${orderProductId}`,

  // 결제
  PAYMENT_SUCCESS: '/payments/success',
  PAYMENT_FAIL: '/payments/fail',

  // 장소
  PLACES: '/places',
  PLACE_DETAIL: (id: string | number) => `/places/${id}`,
  PLACE_FILTER: '/places/filter',
  PLACE_REVIEWS: (id: number) => `/places/${id}/reviews`,
  PLACE_MENU_DETAIL: (placeId: number, menuId: number) => `/places/${placeId}/menus/${menuId}`,

  // 포인트
  POINT: '/point',

  // 개인정보처리방침
  PRIVACY: '/privacy',

  // 리뷰
  REVIEWS: '/reviews',
  REVIEW_DETAIL: (id: string | number) => `/reviews/${id}`,
  REVIEW_EDIT: (id: number) => `/reviews/${id}/edit`,
  REVIEW_PRODUCT_DETAIL: (id: string | number) => `/reviews/${id}/product`,
  REVIEW_CREATE: '/reviews/create',
  REVIEW_CREATE_WITH_MENU: (menuId: string | number) => `/reviews/create?menuId=${menuId}`,

  // 설정
  SETTING: '/setting',

  // 약관
  TERMS: '/terms',

  // 마이페이지 (주석 처리: 실제 페이지 폴더 없음)
  MY_PAGE: '/mypage',
  MY_PROFILE: '/mypage/profile',
  MY_POINTS: '/mypage/points',
  MY_COUPONS: '/mypage/coupons',
  MY_REVIEWS: '/mypage/reviews',
  MY_BOOKMARKS: '/mypage/bookmarks',

  // 장바구니 (주석 처리: 실제 페이지 폴더 없음)
  CART: '/cart',

  // 상품 (주석 처리: 실제 페이지 폴더 없음)
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: string | number) => `/products/${id}`,
  PRODUCT_REVIEWS: (id: number) => `/products/${id}/reviews`,

  // 랭킹 (주석 처리: 실제 페이지 폴더 없음)
  RANKS: '/rank',
  RANK_DETAIL: (id: string | number) => `/ranks/${id}`,

  FAVICON: '/favicon.ico',
} as const

export type PagePath = (typeof PAGE_PATHS)[keyof typeof PAGE_PATHS]

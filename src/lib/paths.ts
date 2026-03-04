import { OrderMethod } from '@/domains/order'

export const PAGE_PATHS = {
  // 홈
  HOME: '/',

  // 상품
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: string | number) => `/products/${id}`,
  PRODUCT_REVIEWS: (id: number) => `/products/${id}/reviews`,

  // 장소
  PLACES: '/places',
  PLACE_DETAIL: (id: string | number) => `/places/${id}`,
  PLACE_FILTER: '/places/filter',
  PLACE_REVIEWS: (id: number) => `/places/${id}/reviews`,
  PLACE_MENU_DETAIL: (placeId: number, menuId: number) => `/places/${placeId}/menus/${menuId}`,

  // 주문 관련
  ORDER_METHOD: (placeId: string | number) => `/places/${placeId}/order/method`,
  ORDER_MENUS: (placeId: string | number, method: OrderMethod) =>
    `/places/${placeId}/order/menus?orderMethod=${encodeURIComponent(method)}`,
  ORDER_MENU_DETAIL: (placeId: number, menuId: number) =>
    `/places/${placeId}/order/menus/${menuId}`,
  ORDER_CART: (placeId: string | number) => `/places/${placeId}/order/cart`,
  ORDER_CHECKOUT: (placeId: string | number) => `/places/${placeId}/order/checkout`,
  ORDERS: '/orders',
  ORDER_DETAIL: (orderId: string | number) => `/orders/${orderId}`,
  ORDER_COMPLETE: (orderId: string | number) => `/orders/${orderId}/complete`,
  ORDERS_REVIEWS_CREATE: (orderItemId: number) =>
    `/orders/reviews/create?orderItemId=${orderItemId}`,
  ORDERS_REVIEWS_EDIT: (orderProductId: number) =>
    `/orders/reviews/edit?orderProductId=${orderProductId}`,

  // 결제
  PAYMENT_SUCCESS: '/payments/success',
  PAYMENT_FAIL: '/payments/fail',

  // 리뷰
  REVIEWS: '/reviews',
  REVIEW_DETAIL: (id: string | number) => `/reviews/${id}`,
  REVIEW_EDIT: (id: number) => `/reviews/${id}/edit`,
  REVIEW_PRODUCT_DETAIL: (id: string | number) => `/reviews/${id}/product`,
  REVIEW_CREATE: '/reviews/create',
  REVIEW_CREATE_WITH_MENU: (menuId: string | number) => `/reviews/create?menuId=${menuId}`,

  // 이벤트
  EVENTS: '/events',
  EVENT_DETAIL: (id: string | number) => `/events/${id}`,

  // 쿠폰
  COUPONS: '/coupons',
  COUPON_DETAIL: (id: string | number) => `/coupons/${id}`,

  // 랭킹
  RANKS: '/rank',
  RANK_DETAIL: (id: string | number) => `/ranks/${id}`,

  // 장바구니
  CART: '/cart',

  // 마이페이지
  MY_PAGE: '/mypage',
  MY_PROFILE: '/mypage/profile',
  MY_POINTS: '/mypage/points',
  MY_COUPONS: '/mypage/coupons',
  MY_REVIEWS: '/mypage/reviews',
  MY_BOOKMARKS: '/mypage/bookmarks',

  // 설정
  SETTING: '/setting',

  // 회원
  MEMBERS: '/members',
  MEMBER_DETAIL: (id: string | number) => `/members/${id}`,
  MEMBER_FOLLOWS: (id: string | number, tab?: 'following' | 'follower') =>
    `/members/${id}/follows${tab ? `?tab=${tab}` : ''}`,

  // 인증
  LOGIN: '/login',
  REGISTER: '/register',

  FAVICON: '/favicon.ico',
} as const

export type PagePath = (typeof PAGE_PATHS)[keyof typeof PAGE_PATHS]

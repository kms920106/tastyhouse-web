export const API_ENDPOINTS = {
  // 장소 추가 엔드포인트
  PLACES_EDITOR_CHOICE: '/api/places/v1/editor-choice',
  PLACES_BEST: '/api/places/v1/best',
  PLACES_LATEST: '/api/places/v1/latest',
  PLACES_STATIONS: '/api/places/v1/stations',
  PLACES_FOOD_TYPES: '/api/places/v1/food-types',
  PLACES_AMENITIES: '/api/places/v1/amenities',

  // 리뷰 추가 엔드포인트
  REVIEWS_BEST: '/api/reviews/v1/best',
  REVIEWS_LATEST: '/api/reviews/v1/latest',

  // 상품 추가 엔드포인트
  PRODUCTS_TODAY_DISCOUNTS: '/api/products/v1/today-discounts',

  // FAQ
  // TODO: API 미구현 상태 - 실제 엔드포인트 확정 후 수정 필요
  FAQS: '/api/faqs/v1',

  // 인증
  AUTH_LOGIN: '/api/auth/login',
  AUTH_LOGOUT: '/api/auth/v1/logout',
  AUTH_REFRESH: '/api/auth/v1/refresh',
  AUTH_REGISTER: '/api/auth/v1/register',
} as const

export type ApiEndpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS]

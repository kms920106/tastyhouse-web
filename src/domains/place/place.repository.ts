import 'server-only'

import { api, publicApi } from '@/lib/api'
import { PaginationParams } from '@/types/common'
import {
  MenuCategoryResponse,
  PlaceAmenityResponse,
  PlaceBannerListItemResponse,
  PlaceBestListItemResponse,
  PlaceBookmarkResponse,
  PlaceChoiceListItemResponse,
  PlaceFoodTypeListItemResponse,
  PlaceInfoResponse,
  PlaceLatestListItemResponse,
  PlaceNameResponse,
  PlaceDetailResponse,
  PlaceOrderMethodResponse,
  PlacePhotoCategoryResponse,
  PlaceReviewStatisticsResponse,
  PlaceReviewsByRatingResponse,
  PlaceStationListItemResponse,
  PlaceSummaryResponse,
} from './place.dto'
import type { PlaceMapMarker } from './place.model'

const ENDPOINT = '/api/places'

const CACHE_OPTIONS = { cache: 'force-cache' as const, next: { revalidate: 3600 } }

export const placeRepository = {
  // 최신 플레이스 목록 조회
  async getLatestPlaces(params: PaginationParams) {
    return publicApi.get<PlaceLatestListItemResponse[], PaginationParams>(`${ENDPOINT}/v1/latest`, {
      ...CACHE_OPTIONS,
      params,
    })
  },
  // 베스트 플레이스 목록 조회
  async getBestPlaces(params: PaginationParams) {
    return publicApi.get<PlaceBestListItemResponse[], PaginationParams>(`${ENDPOINT}/v1/best`, {
      ...CACHE_OPTIONS,
      params,
    })
  },
  // 테하 초이스 조회
  async getChoicePlaces(params: PaginationParams) {
    return publicApi.get<PlaceChoiceListItemResponse[], PaginationParams>(
      `${ENDPOINT}/v1/editor-choice`,
      {
        ...CACHE_OPTIONS,
        params,
      },
    )
  },
  // 전철역 목록 조회
  async getPlaceStations() {
    return publicApi.get<PlaceStationListItemResponse[]>(`${ENDPOINT}/v1/stations`, CACHE_OPTIONS)
  },
  // 음식종류 목록 조회
  async getPlaceFoodTypes() {
    return publicApi.get<PlaceFoodTypeListItemResponse[]>(
      `${ENDPOINT}/v1/food-types`,
      CACHE_OPTIONS,
    )
  },
  // 편의시설 목록 조회
  async getPlaceAmenities() {
    return publicApi.get<PlaceAmenityResponse[]>(`${ENDPOINT}/v1/amenities`, CACHE_OPTIONS)
  },
  // 상호명 조회
  async getPlaceName(placeId: number) {
    return publicApi.get<PlaceNameResponse>(`${ENDPOINT}/v1/${placeId}/name`, CACHE_OPTIONS)
  },
  // 플레이스 요약 정보 조회
  async getPlaceSummary(placeId: number) {
    return publicApi.get<PlaceSummaryResponse>(`${ENDPOINT}/v1/${placeId}/summary`, CACHE_OPTIONS)
  },
  // 플레이스 배너 이미지 조회
  async getPlaceBanners(placeId: number) {
    return publicApi.get<PlaceBannerListItemResponse[]>(
      `${ENDPOINT}/v1/${placeId}/banners`,
      CACHE_OPTIONS,
    )
  },
  // 북마크 여부 조회
  async getPlaceBookmark(placeId: number) {
    return api.get<PlaceBookmarkResponse>(`${ENDPOINT}/v1/${placeId}/bookmark`)
  },
  // 북마크 토글
  async togglePlaceBookmark(placeId: number) {
    return api.post<PlaceBookmarkResponse>(`${ENDPOINT}/v1/${placeId}/bookmark`)
  },
  // 플레이스 정보 조회
  async getPlaceInfo(placeId: number) {
    return publicApi.get<PlaceInfoResponse>(`${ENDPOINT}/v1/${placeId}/info`, CACHE_OPTIONS)
  },
  // 플레이스 메뉴 목록 조회
  async getPlaceMenus(placeId: number) {
    return publicApi.get<MenuCategoryResponse[]>(`${ENDPOINT}/v1/${placeId}/menus`, CACHE_OPTIONS)
  },
  // 플레이스 포토 목록 조회
  async getPlacePhotos(placeId: number) {
    return publicApi.get<PlacePhotoCategoryResponse[]>(
      `${ENDPOINT}/v1/${placeId}/photos`,
      CACHE_OPTIONS,
    )
  },
  // 플레이스 리뷰 통계 조회
  async getPlaceReviewStatistics(placeId: number) {
    return publicApi.get<PlaceReviewStatisticsResponse>(
      `${ENDPOINT}/v1/${placeId}/reviews/statistics`,
      CACHE_OPTIONS,
    )
  },
  // 플레이스 리뷰 목록 조회
  async getPlaceReviews(placeId: number, params: PaginationParams) {
    return publicApi.get<PlaceReviewsByRatingResponse>(`${ENDPOINT}/v1/${placeId}/reviews`, {
      ...CACHE_OPTIONS,
      params,
    })
  },
  // 주문 수단 조회
  async getPlaceOrderMethods(placeId: number) {
    return publicApi.get<PlaceOrderMethodResponse>(
      `${ENDPOINT}/v1/${placeId}/order-methods`,
      CACHE_OPTIONS,
    )
  },
  // 지도 마커 목록 조회
  async getMapMarkers(params: { latitude: number; longitude: number }) {
    return publicApi.get<PlaceMapMarker[]>(`${ENDPOINT}/v1/map/markers`, { params })
  },
  // 플레이스 상세 조회
  async getPlaceDetail(placeId: number) {
    return publicApi.get<PlaceDetailResponse>(`${ENDPOINT}/v1/${placeId}`, CACHE_OPTIONS)
  },
}

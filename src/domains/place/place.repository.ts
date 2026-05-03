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
  async getLatestPlaces(params: PaginationParams) {
    return publicApi.get<PlaceLatestListItemResponse[], PaginationParams>(`${ENDPOINT}/v1/latest`, {
      ...CACHE_OPTIONS,
      params,
    })
  },
  async getBestPlaces(params: PaginationParams) {
    return publicApi.get<PlaceBestListItemResponse[], PaginationParams>(`${ENDPOINT}/v1/best`, {
      ...CACHE_OPTIONS,
      params,
    })
  },
  async getChoicePlaces(params: PaginationParams) {
    return publicApi.get<PlaceChoiceListItemResponse[], PaginationParams>(
      `${ENDPOINT}/v1/editor-choice`,
      {
        ...CACHE_OPTIONS,
        params,
      },
    )
  },
  async getPlaceStations() {
    return publicApi.get<PlaceStationListItemResponse[]>(`${ENDPOINT}/v1/stations`, CACHE_OPTIONS)
  },
  async getPlaceFoodTypes() {
    return publicApi.get<PlaceFoodTypeListItemResponse[]>(
      `${ENDPOINT}/v1/food-types`,
      CACHE_OPTIONS,
    )
  },
  async getPlaceAmenities() {
    return publicApi.get<PlaceAmenityResponse[]>(`${ENDPOINT}/v1/amenities`, CACHE_OPTIONS)
  },
  async getPlaceName(placeId: number) {
    return publicApi.get<PlaceNameResponse>(`${ENDPOINT}/v1/${placeId}/name`, CACHE_OPTIONS)
  },
  async getPlaceSummary(placeId: number) {
    return publicApi.get<PlaceSummaryResponse>(`${ENDPOINT}/v1/${placeId}/summary`, CACHE_OPTIONS)
  },
  async getPlaceBanners(placeId: number) {
    return publicApi.get<PlaceBannerListItemResponse[]>(
      `${ENDPOINT}/v1/${placeId}/banners`,
      CACHE_OPTIONS,
    )
  },
  async getPlaceBookmark(placeId: number) {
    return api.get<PlaceBookmarkResponse>(`${ENDPOINT}/v1/${placeId}/bookmark`)
  },
  async togglePlaceBookmark(placeId: number) {
    return api.post<PlaceBookmarkResponse>(`${ENDPOINT}/v1/${placeId}/bookmark`)
  },
  async getPlaceInfo(placeId: number) {
    return publicApi.get<PlaceInfoResponse>(`${ENDPOINT}/v1/${placeId}/info`, CACHE_OPTIONS)
  },
  async getPlaceMenus(placeId: number) {
    return publicApi.get<MenuCategoryResponse[]>(`${ENDPOINT}/v1/${placeId}/menus`, CACHE_OPTIONS)
  },
  async getPlacePhotos(placeId: number) {
    return publicApi.get<PlacePhotoCategoryResponse[]>(
      `${ENDPOINT}/v1/${placeId}/photos`,
      CACHE_OPTIONS,
    )
  },
  async getPlaceReviewStatistics(placeId: number) {
    return publicApi.get<PlaceReviewStatisticsResponse>(
      `${ENDPOINT}/v1/${placeId}/reviews/statistics`,
      CACHE_OPTIONS,
    )
  },
  async getPlaceReviews(placeId: number, params: PaginationParams) {
    return publicApi.get<PlaceReviewsByRatingResponse>(`${ENDPOINT}/v1/${placeId}/reviews`, {
      ...CACHE_OPTIONS,
      params,
    })
  },
  async getPlaceOrderMethods(placeId: number) {
    return publicApi.get<PlaceOrderMethodResponse>(
      `${ENDPOINT}/v1/${placeId}/order-methods`,
      CACHE_OPTIONS,
    )
  },
  async getMapMarkers(params: { latitude: number; longitude: number }) {
    return publicApi.get<PlaceMapMarker[]>(`${ENDPOINT}/v1/map/markers`, { params })
  },
}

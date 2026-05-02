import 'server-only'

import { api } from '@/lib/api'
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
  PlaceMapMarkerResponse,
  PlaceNameResponse,
  PlaceOrderMethodResponse,
  PlacePhotoCategoryResponse,
  PlaceReviewStatisticsResponse,
  PlaceReviewsByRatingResponse,
  PlaceStationListItemResponse,
  PlaceSummaryResponse,
} from './place.dto'

const ENDPOINT = '/api/places'

export const placeRepository = {
  async getLatestPlaces(params: PaginationParams) {
    return api.get<PlaceLatestListItemResponse[], PaginationParams>(`${ENDPOINT}/v1/latest`, {
      params,
    })
  },
  async getBestPlaces(params: PaginationParams) {
    return api.get<PlaceBestListItemResponse[], PaginationParams>(`${ENDPOINT}/v1/best`, { params })
  },
  async getChoicePlaces(params: PaginationParams) {
    return api.get<PlaceChoiceListItemResponse[], PaginationParams>(
      `${ENDPOINT}/v1/editor-choice`,
      {
        params,
      },
    )
  },
  async getPlaceStations() {
    return api.get<PlaceStationListItemResponse[]>(`${ENDPOINT}/v1/stations`)
  },
  async getPlaceFoodTypes() {
    return api.get<PlaceFoodTypeListItemResponse[]>(`${ENDPOINT}/v1/food-types`)
  },
  async getPlaceAmenities() {
    return api.get<PlaceAmenityResponse[]>(`${ENDPOINT}/v1/amenities`)
  },
  async getPlaceName(placeId: number) {
    return api.get<PlaceNameResponse>(`${ENDPOINT}/v1/${placeId}/name`)
  },
  async getPlaceSummary(placeId: number) {
    return api.get<PlaceSummaryResponse>(`${ENDPOINT}/v1/${placeId}/summary`)
  },
  async getPlaceBanners(placeId: number) {
    return api.get<PlaceBannerListItemResponse[]>(`${ENDPOINT}/v1/${placeId}/banners`)
  },
  async getPlaceBookmark(placeId: number) {
    return api.get<PlaceBookmarkResponse>(`${ENDPOINT}/v1/${placeId}/bookmark`)
  },
  async togglePlaceBookmark(placeId: number) {
    return api.post<PlaceBookmarkResponse>(`${ENDPOINT}/v1/${placeId}/bookmark`)
  },
  async getPlaceInfo(placeId: number) {
    return api.get<PlaceInfoResponse>(`${ENDPOINT}/v1/${placeId}/info`)
  },
  async getPlaceMenus(placeId: number) {
    return api.get<MenuCategoryResponse[]>(`${ENDPOINT}/v1/${placeId}/menus`)
  },
  async getPlacePhotos(placeId: number) {
    return api.get<PlacePhotoCategoryResponse[]>(`${ENDPOINT}/v1/${placeId}/photos`)
  },
  async getPlaceReviewStatistics(placeId: number) {
    return api.get<PlaceReviewStatisticsResponse>(`${ENDPOINT}/v1/${placeId}/reviews/statistics`)
  },
  async getPlaceReviews(placeId: number, params: PaginationParams) {
    return api.get<PlaceReviewsByRatingResponse>(`${ENDPOINT}/v1/${placeId}/reviews`, {
      params,
    })
  },
  async getPlaceOrderMethods(placeId: number) {
    return api.get<PlaceOrderMethodResponse>(`${ENDPOINT}/v1/${placeId}/order-methods`)
  },
  async getMapMarkers(params: { latitude: number; longitude: number }) {
    return api.get<PlaceMapMarkerResponse[]>(`${ENDPOINT}/v1/map/markers`, { params })
  },
}

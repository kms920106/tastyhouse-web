import { api } from '@/lib/api'
import {
  MenuCategory,
  PlaceAmenity,
  PlaceBannerListItemResponse,
  PlaceBestListItemResponse,
  PlaceBestQuery,
  PlaceBookmarkResponse,
  PlaceChoiceListItemResponse,
  PlaceChoiceQuery,
  PlaceFoodTypeListItemResponse,
  PlaceInfoResponse,
  PlaceLatestListItemResponse,
  PlaceLatestQuery,
  PlaceNameResponse,
  PlaceOrderMethodResponse,
  PlacePhotoCategoryResponse,
  PlaceReviewStatisticsResponse,
  PlaceReviewsByRatingQuery,
  PlaceReviewsByRatingResponse,
  PlaceStationListItemResponse,
  PlaceSummaryResponse,
} from './place.type'

const ENDPOINT = '/api/places'

export const placeRepository = {
  async getLatestPlaces(params: PlaceLatestQuery) {
    return api.get<PlaceLatestListItemResponse[]>(`${ENDPOINT}/v1/latest`, { params })
  },
  async getBestPlaces(params: PlaceBestQuery) {
    return api.get<PlaceBestListItemResponse[]>(`${ENDPOINT}/v1/best`, { params })
  },
  async getChoicePlaces(params: PlaceChoiceQuery) {
    return api.get<PlaceChoiceListItemResponse[]>(`${ENDPOINT}/v1/editor-choice`, {
      params,
    })
  },
  async getPlaceStations() {
    return api.get<PlaceStationListItemResponse[]>(`${ENDPOINT}/v1/stations`)
  },
  async getPlaceFoodTypes() {
    return api.get<PlaceFoodTypeListItemResponse[]>(`${ENDPOINT}/v1/food-types`)
  },
  async getPlaceAmenities() {
    return api.get<PlaceAmenity[]>(`${ENDPOINT}/v1/amenities`)
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
    return api.get<MenuCategory[]>(`${ENDPOINT}/v1/${placeId}/menus`)
  },
  async getPlacePhotos(placeId: number) {
    return api.get<PlacePhotoCategoryResponse[]>(`${ENDPOINT}/v1/${placeId}/photos`)
  },
  async getPlaceReviewStatistics(placeId: number) {
    return api.get<PlaceReviewStatisticsResponse>(
      `${ENDPOINT}/v1/${placeId}/reviews/statistics`,
    )
  },
  async getPlaceReviews(placeId: number, params: PlaceReviewsByRatingQuery) {
    return api.get<PlaceReviewsByRatingResponse>(`${ENDPOINT}/v1/${placeId}/reviews`, {
      params,
    })
  },
  async getPlaceOrderMethods(placeId: number) {
    return api.get<PlaceOrderMethodResponse>(`${ENDPOINT}/v1/${placeId}/order-methods`)
  },
}

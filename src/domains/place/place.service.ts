import { placeRepository } from './place.repository'
import {
  PlaceBestQuery,
  PlaceChoiceQuery,
  PlaceLatestQuery,
  PlaceReviewsByRatingQuery,
} from './place.type'

export const placeService = {
  async getLatestPlaces(params: PlaceLatestQuery) {
    return placeRepository.getLatestPlaces(params)
  },
  async getBestPlaces(params: PlaceBestQuery) {
    return placeRepository.getBestPlaces(params)
  },
  async getChoicePlaces(params: PlaceChoiceQuery) {
    return placeRepository.getChoicePlaces(params)
  },
  async getPlaceStations() {
    return placeRepository.getPlaceStations()
  },
  async getPlaceFoodTypes() {
    return placeRepository.getPlaceFoodTypes()
  },
  async getPlaceAmenities() {
    return placeRepository.getPlaceAmenities()
  },
  async getPlaceName(placeId: number) {
    return placeRepository.getPlaceName(placeId)
  },
  async getPlaceSummary(placeId: number) {
    return placeRepository.getPlaceSummary(placeId)
  },
  async getPlaceBanners(placeId: number) {
    return placeRepository.getPlaceBanners(placeId)
  },
  async togglePlaceBookmark(placeId: number) {
    return placeRepository.togglePlaceBookmark(placeId)
  },
  async getPlaceBookmark(placeId: number) {
    return placeRepository.getPlaceBookmark(placeId)
  },
  async getPlaceInfo(placeId: number) {
    return placeRepository.getPlaceInfo(placeId)
  },
  async getPlaceMenus(placeId: number) {
    return placeRepository.getPlaceMenus(placeId)
  },
  async getPlacePhotos(placeId: number) {
    return placeRepository.getPlacePhotos(placeId)
  },
  async getPlaceReviewStatistics(placeId: number) {
    return placeRepository.getPlaceReviewStatistics(placeId)
  },
  async getPlaceReviews(placeId: number, params: PlaceReviewsByRatingQuery) {
    return placeRepository.getPlaceReviews(placeId, params)
  },
  async getPlaceOrderMethods(placeId: number) {
    return placeRepository.getPlaceOrderMethods(placeId)
  },
  async getMapMarkers(params: { latitude: number; longitude: number }) {
    return placeRepository.getMapMarkers(params)
  },
}

'use server'

import { PlaceLatestQuery, PlaceMapMarkerResponse, PlaceReviewsByRatingQuery, placeRepository } from '@/domains/place'

export async function getMapMarkers(params: {
  latitude: number
  longitude: number
}): Promise<PlaceMapMarkerResponse[]> {
  const response = await placeRepository.getMapMarkers(params)
  return response.data ?? []
}

export async function getLatestPlaces(query: PlaceLatestQuery) {
  return placeRepository.getLatestPlaces(query)
}

export async function getPlaceInfo(placeId: number) {
  return placeRepository.getPlaceInfo(placeId)
}

export async function getPlaceName(placeId: number) {
  return placeRepository.getPlaceName(placeId)
}

export async function togglePlaceBookmark(placeId: number) {
  return placeRepository.togglePlaceBookmark(placeId)
}

export async function getPlaceMenus(placeId: number) {
  return placeRepository.getPlaceMenus(placeId)
}

export async function getPlacePhotos(placeId: number) {
  return placeRepository.getPlacePhotos(placeId)
}

export async function getPlaceReviewStatistics(placeId: number) {
  return placeRepository.getPlaceReviewStatistics(placeId)
}

export async function getPlaceReviews(placeId: number, query: PlaceReviewsByRatingQuery) {
  return placeRepository.getPlaceReviews(placeId, query)
}

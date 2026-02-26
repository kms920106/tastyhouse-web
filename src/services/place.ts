'use server'

import { PlaceLatestQuery, PlaceMapMarkerResponse, PlaceReviewsByRatingQuery, placeService } from '@/domains/place'

export async function getMapMarkers(params: {
  latitude: number
  longitude: number
}): Promise<PlaceMapMarkerResponse[]> {
  const response = await placeService.getMapMarkers(params)
  return response.data ?? []
}

export async function getLatestPlaces(query: PlaceLatestQuery) {
  return await placeService.getLatestPlaces(query)
}

export async function getPlaceInfo(placeId: number) {
  return await placeService.getPlaceInfo(placeId)
}

export async function getPlaceName(placeId: number) {
  return await placeService.getPlaceName(placeId)
}

export async function togglePlaceBookmark(placeId: number) {
  return await placeService.togglePlaceBookmark(placeId)
}

export async function getPlaceMenus(placeId: number) {
  return await placeService.getPlaceMenus(placeId)
}

export async function getPlacePhotos(placeId: number) {
  return await placeService.getPlacePhotos(placeId)
}

export async function getPlaceReviewStatistics(placeId: number) {
  return await placeService.getPlaceReviewStatistics(placeId)
}

export async function getPlaceReviews(placeId: number, query: PlaceReviewsByRatingQuery) {
  return await placeService.getPlaceReviews(placeId, query)
}

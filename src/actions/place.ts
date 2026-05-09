'use server'

import type { PlaceMapMarker } from '@/domains/place'
import { placeRepository } from '@/domains/place/place.repository'
import { placeService } from '@/domains/place/place.service'

export async function getMapMarkers(params: {
  latitude: number
  longitude: number
}): Promise<PlaceMapMarker[]> {
  const response = await placeRepository.getMapMarkers(params)
  return response.data ?? []
}

export async function togglePlaceBookmark(placeId: number) {
  return placeRepository.togglePlaceBookmark(placeId)
}

export async function getLatestPlaces({ page, size }: { page: number; size: number }) {
  return placeRepository.getLatestPlaces({ page, size })
}

export async function getPlaceInfo(placeId: number) {
  return placeRepository.getPlaceInfo(placeId)
}

export async function getPlaceDetail(placeId: number) {
  return placeRepository.getPlaceDetail(placeId)
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

export async function getPlaceReviews(
  placeId: number,
  { page, size }: { page: number; size: number },
) {
  return placeRepository.getPlaceReviews(placeId, { page, size })
}

export async function getPlaceFoodTypes() {
  return placeService.getPlaceFoodTypes()
}

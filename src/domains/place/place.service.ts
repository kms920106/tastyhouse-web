import { getPlaceAmenityCodeName, getPlaceFoodTypeCodeName } from './place.constants'
import { placeRepository } from './place.repository'

export const placeService = {
  async getPlaceFoodTypes() {
    const response = await placeRepository.getPlaceFoodTypes()
    if (response.data) {
      response.data = response.data.map((item) => ({
        ...item,
        name: getPlaceFoodTypeCodeName(item.code),
      }))
    }
    return response
  },

  async getPlaceAmenities() {
    const response = await placeRepository.getPlaceAmenities()
    if (response.data) {
      response.data = response.data.map((item) => ({
        ...item,
        name: getPlaceAmenityCodeName(item.code),
      }))
    }
    return response
  },
}

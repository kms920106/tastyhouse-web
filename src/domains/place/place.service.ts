import 'server-only'
import { placeRepository } from './place.repository'
import { getPlaceFoodTypeCodeName } from './place.constants'

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
}

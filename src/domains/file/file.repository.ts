import { api } from '@/lib/api'

const ENDPOINT = '/api/files'

export const fileRepository = {
  async uploadFile(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    return api.upload(`${ENDPOINT}/v1/upload`, formData)
  },
}

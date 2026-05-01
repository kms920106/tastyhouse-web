import 'server-only'
import { api } from '@/lib/api'
import { FileUploadResponse } from './file.dto'

const ENDPOINT = '/api/files'

export const fileRepository = {
  async uploadFile(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    return api.upload<FileUploadResponse>(`${ENDPOINT}/v1/upload`, formData)
  },
}

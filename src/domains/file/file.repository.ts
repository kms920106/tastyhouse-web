import { ApiResponse } from '@/types/common'
import { FileUploadResponse } from './file.type'

const ENDPOINT = '/api/files'

export const fileRepository = {
  async uploadFile(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    const baseURL = process.env.NEXT_PUBLIC_API_URL || ''
    const url = `${baseURL}${ENDPOINT}/v1/upload`

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })

    const status = response.status
    const data = await response.json().catch(() => null)

    if (!response.ok) {
      return {
        error: data?.message || response.statusText || 'An error occurred',
        status,
      }
    }

    return { data, status }
  },
}

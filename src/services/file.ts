'use server'

import { fileService } from '@/domains/file'

export async function uploadFile(file: File) {
  return await fileService.uploadFile(file)
}

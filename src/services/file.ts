'use server'

import { fileRepository } from '@/domains/file'

export async function uploadFile(file: File) {
  return fileRepository.uploadFile(file)
}

import { fileRepository } from './file.repository'

export const fileService = {
  async uploadFile(file: File) {
    return await fileRepository.uploadFile(file)
  },
}

import { gradeRepository } from './grade.repository'

export const gradeService = {
  async getMyGrade() {
    return await gradeRepository.getMyGrade()
  },
  async getGradeInfoList() {
    return await gradeRepository.getGradeInfoList()
  },
}

'use server'

import { gradeRepository } from '@/domains/grade'

export async function getMyGrade() {
  return gradeRepository.getMyGrade()
}

export async function getGradeInfoList() {
  return gradeRepository.getGradeInfoList()
}

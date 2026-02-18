'use server'

import { gradeService } from '@/domains/grade'

export async function getMyGrade() {
  return await gradeService.getMyGrade()
}

export async function getGradeInfoList() {
  return await gradeService.getGradeInfoList()
}

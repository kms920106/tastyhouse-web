'use server'

import { BugReportCreateRequest, bugReportRepository } from '@/domains/bug-report'

export async function createBugReport(request: BugReportCreateRequest) {
  return bugReportRepository.createBugReport(request)
}

'use server'

import type { BugReportCreateRequest } from '@/domains/bug-report'
import { bugReportRepository } from '@/domains/bug-report/bug-report.repository'

export async function createBugReport(request: BugReportCreateRequest) {
  return bugReportRepository.createBugReport(request)
}

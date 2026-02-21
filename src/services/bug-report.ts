'use server'

import { BugReportCreateRequest, bugReportService } from '@/domains/bug-report'

export async function createBugReport(request: BugReportCreateRequest) {
  return await bugReportService.createBugReport(request)
}

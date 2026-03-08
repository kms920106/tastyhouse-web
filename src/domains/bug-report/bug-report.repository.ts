import { api } from '@/lib/api'
import { BugReportCreateRequest, BugReportResponse } from './bug-report.type'

const ENDPOINT = '/api/bug-reports'

export const bugReportRepository = {
  async createBugReport(request: BugReportCreateRequest) {
    return api.post<BugReportResponse>(`${ENDPOINT}/v1`, request)
  },
}

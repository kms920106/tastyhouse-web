import { API_ENDPOINTS } from '@/lib/endpoints'
import { api } from '@/lib/api'
import { BugReportCreateRequest, BugReportResponse } from './bug-report.type'

export const bugReportRepository = {
  async createBugReport(request: BugReportCreateRequest) {
    return api.post<BugReportResponse>(API_ENDPOINTS.BUG_REPORTS, request)
  },
}

import { API_ENDPOINTS } from '@/lib/endpoints'
import { api } from '@/lib/api'
import { ApiResponse } from '@/types/common'
import { BugReportCreateRequest, BugReportResponse } from './bug-report.type'

export const bugReportRepository = {
  async createBugReport(request: BugReportCreateRequest) {
    return api.post<ApiResponse<BugReportResponse>>(API_ENDPOINTS.BUG_REPORTS, request)
  },
}

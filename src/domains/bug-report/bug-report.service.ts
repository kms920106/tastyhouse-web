import { bugReportRepository } from './bug-report.repository'
import { BugReportCreateRequest } from './bug-report.type'

export const bugReportService = {
  async createBugReport(request: BugReportCreateRequest) {
    return bugReportRepository.createBugReport(request)
  },
}

import FetchErrorState from '@/components/ui/FetchErrorState'
import HtmlContent from '@/components/ui/HtmlContent'
import { policiesRepository } from '@/domains/policies/policies.repository'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'

export default async function TermsContent() {
  const { error, status, data } = await policiesRepository.getLatestTermsOfService()

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('이용약관')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  const { content } = data

  return (
    <div className="px-[15px] py-7">
      <HtmlContent content={content} />
    </div>
  )
}

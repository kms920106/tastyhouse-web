import { faqService } from '@/domains/faq'
import FaqSection from './_components/FaqSection'

interface FaqsPageProps {
  searchParams: Promise<{ categoryId?: string }>
}

export default async function FaqsPage({ searchParams }: FaqsPageProps) {
  const params = await searchParams
  const initialCategoryId = params.categoryId ? Number(params.categoryId) : 0

  const [categoriesResponse, faqsResponse] = await Promise.all([
    faqService.getFaqCategories(),
    faqService.getFaqList(initialCategoryId !== 0 ? { categoryId: initialCategoryId } : undefined),
  ])

  const initialCategories = categoriesResponse.data?.data ?? []
  const initialFaqs = faqsResponse.data?.data ?? []

  return (
    <FaqSection
      initialCategoryId={initialCategoryId}
      initialCategories={initialCategories}
      initialFaqs={initialFaqs}
    />
  )
}

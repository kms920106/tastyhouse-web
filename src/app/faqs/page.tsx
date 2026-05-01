import { faqRepository } from '@/domains/faq/faq.repository'
import FaqSection from './_components/FaqSection'

interface Props {
  searchParams: Promise<{ categoryId?: string }>
}

export default async function FaqsPage({ searchParams }: Props) {
  const params = await searchParams
  const initialCategoryId = params.categoryId ? Number(params.categoryId) : 0

  const [categoriesResponse, faqsResponse] = await Promise.all([
    faqRepository.getFaqCategories(),
    faqRepository.getFaqList(initialCategoryId !== 0 ? { categoryId: initialCategoryId } : undefined),
  ])

  const initialCategories = categoriesResponse.data ?? []
  const initialFaqs = faqsResponse.data ?? []

  return (
    <FaqSection
      initialCategoryId={initialCategoryId}
      initialCategories={initialCategories}
      initialFaqs={initialFaqs}
    />
  )
}

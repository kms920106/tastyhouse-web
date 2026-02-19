import { FaqCategory } from '@/domains/faq'
import FaqSection from './_components/FaqSection'

interface FaqsPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function FaqsPage({ searchParams }: FaqsPageProps) {
  const params = await searchParams
  const initialCategory = (params.category || '전체') as FaqCategory

  return <FaqSection initialCategory={initialCategory} />
}

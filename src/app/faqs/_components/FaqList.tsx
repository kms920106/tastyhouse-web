'use client'

import { getFaqCategories, getFaqList } from '@/actions/faq'
import { Accordion } from '@/components/ui/shadcn/accordion'
import { useQuery } from '@tanstack/react-query'
import FaqAccordionItem from './FaqAccordionItem'
import FaqListItemSkeleton from './FaqListItemSkeleton'
import { ALL_CATEGORY_ID, FAQ_SELECTED_CATEGORY_QUERY_KEY } from './faqQueryKeys'

export default function FaqList() {
  const { data: selectedCategoryId = ALL_CATEGORY_ID } = useQuery<number>({
    queryKey: FAQ_SELECTED_CATEGORY_QUERY_KEY,
    queryFn: () => ALL_CATEGORY_ID,
    staleTime: Infinity,
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['faq', 'categories'],
    queryFn: () => getFaqCategories(),
  })

  const { data, isFetching } = useQuery({
    queryKey: ['faq', 'list', selectedCategoryId],
    queryFn: () =>
      getFaqList(
        selectedCategoryId !== ALL_CATEGORY_ID ? { categoryId: selectedCategoryId } : undefined,
      ),
  })

  const faqs = data?.data ?? []
  const categories = categoriesData?.data ?? []

  const getCategoryName = (categoryId: number) =>
    categories.find((c) => c.id === categoryId)?.name ?? ''

  if (isFetching) {
    return <FaqListItemSkeleton />
  }

  return (
    <Accordion type="multiple" className="w-full">
      {faqs.map((faq) => (
        <FaqAccordionItem key={faq.id} faq={faq} categoryName={getCategoryName(faq.categoryId)} />
      ))}
    </Accordion>
  )
}

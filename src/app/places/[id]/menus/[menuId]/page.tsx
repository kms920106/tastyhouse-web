import { PAGE_PATHS } from '@/lib/paths'
import { redirect } from 'next/navigation'

interface Props {
  params: Promise<{
    id: string
    menuId: string
  }>
}

export default async function PlaceMenuDetailPage({ params }: Props) {
  const { id } = await params
  redirect(PAGE_PATHS.PLACE_DETAIL(id))
}

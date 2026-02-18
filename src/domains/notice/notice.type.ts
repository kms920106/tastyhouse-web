export type NoticeListQuery = {
  page: number
  size: number
}

export type NoticeListItem = {
  id: number
  title: string
  content: string
  createdAt: string
}
